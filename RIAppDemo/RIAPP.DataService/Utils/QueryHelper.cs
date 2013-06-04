using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Linq.DynamicQuery;
using RIAPP.DataService.Resources;

namespace RIAPP.DataService.Utils
{
    public class QueryHelperClass
    {
        private DataHelperClass _dataHelper;

        public QueryHelperClass(DataHelperClass dataHelper)
        {
            this._dataHelper = dataHelper;
        }

        public static object FindEntity(IQueryable entities, RowInfo rowInfo, object[] keyValue)
        {
            string predicate =  QueryHelperClass.GetWherePKPredicate(rowInfo);

            if (keyValue == null || keyValue.Length < 1 || keyValue.Any((kv) => kv == null))
            {
                throw new DomainServiceException(string.Format(ErrorStrings.ERR_ROWINFO_PKVAL_INVALID, rowInfo.dbSetInfo.EntityType.Name, string.Join(";", keyValue)));
            }

            IQueryable query = entities.Where(predicate, keyValue);
            object dbEntity = null;
            int cnt = 0;
            foreach (var entity in query)
            {
                dbEntity = entity;
                ++cnt;
                if (cnt > 1)
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_ROWINFO_PKVAL_INVALID, rowInfo.dbSetInfo.EntityType.Name, string.Join(";", keyValue)));
            }

            return dbEntity;
        }

        public IQueryable<T> PerformSort<T>(IQueryable<T> entities, SortInfo sort)
            where T : class
        {
            IQueryable<T> result = entities;
            if (sort == null || sort.sortItems == null || sort.sortItems.Count == 0)
                return result;

            if (sort == null || sort.sortItems == null || sort.sortItems.Count == 0)
                return result;
            bool first = true;
            System.Text.StringBuilder sb = new System.Text.StringBuilder();
            foreach (SortItem si in sort.sortItems)
            {
                string fldName = si.fieldName;
                if (!first)
                    sb.Append(",");
                sb.Append(fldName);
                if (si.sortOrder == SortOrder.DESC)
                {
                    sb.Append(" DESC");
                }
                first = false;
            }

            result = result.OrderBy(sb.ToString(), new object[] { });
            return result;
        }

        public IQueryable<T> PerformFilter<T>(IQueryable<T> entities, FilterInfo filter, DbSetInfo dbInfo)
            where T : class
        {
            IQueryable<T> result = entities;
            if (filter == null || filter.filterItems == null || filter.filterItems.Count == 0)
                return result;
            int cnt = 0;
            StringBuilder sb = new StringBuilder();
            LinkedList<object> filterParams = new LinkedList<object>();
            foreach (FilterItem filterItem in filter.filterItems)
            {
                FieldInfo finfo = dbInfo.fieldInfos.Where(finf => finf.fieldName == filterItem.fieldName).FirstOrDefault();
                if (finfo == null)
                    throw new DomainServiceException(string.Format(ErrorStrings.ERR_REC_FIELDNAME_INVALID, dbInfo.dbSetName, filterItem.fieldName));
                if (cnt > 0)
                    sb.Append(" and ");
                switch (filterItem.kind)
                {
                    case FilterType.Equals:
                        if (filterItem.values.Count == 1)
                        {
                            sb.AppendFormat("{0}==@{1}", filterItem.fieldName, cnt);
                            filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        }
                        else
                        {
                            List<object> vals = new List<object>();
                            foreach (string v in filterItem.values)
                                vals.Add(this._dataHelper.ConvertToTyped(typeof(T), finfo, v));

                            sb.AppendFormat("@{0}.Contains(outerIt.{1})", cnt, filterItem.fieldName);
                            filterParams.AddLast(vals);
                        }
                        break;
                    case FilterType.StartsWith:
                        sb.AppendFormat("{0}.StartsWith(@{1})", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.EndsWith:
                        sb.AppendFormat("{0}.EndsWith(@{1})", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.Contains:
                        sb.AppendFormat("{0}.Contains(@{1})", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.Gt:
                        sb.AppendFormat("{0}>@{1}", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.Lt:
                        sb.AppendFormat("{0}<@{1}", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.GtEq:
                        sb.AppendFormat("{0}>=@{1}", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.LtEq:
                        sb.AppendFormat("{0}<=@{1}", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.NotEq:
                        sb.AppendFormat("{0}!=@{1}", filterItem.fieldName, cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        break;
                    case FilterType.Between:
                        sb.AppendFormat("{0}>=@{1} and {0}<=@{2}", filterItem.fieldName, cnt, ++cnt);
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.FirstOrDefault()));
                        filterParams.AddLast(this._dataHelper.ConvertToTyped(typeof(T), finfo, filterItem.values.LastOrDefault()));
                        break;
                }

                ++cnt;
            }
            result = entities.Where(sb.ToString(), filterParams.ToArray());
            return result;
        }

        public IQueryable<T> GetPage<T>(IQueryable<T> entities, int pageIndex, int pageSize, int pageCount, DbSetInfo dbInfo)
            where T : class
        {
            IQueryable<T> result = entities;
            if (!dbInfo.enablePaging)
                return result;
            int skipRows = pageIndex * pageSize;
            result = entities.Skip(skipRows).Take(pageSize * pageCount);
            return result;
        }

        public IQueryable<T> PerformQuery<T>(IQueryable<T> entities, GetDataInfo getInfo, ref int? totalCount)
          where T : class
        {
            if (getInfo.isIncludeTotalCount && !totalCount.HasValue)
            {
                totalCount = this.GetTotalCount(entities, getInfo.filterInfo, getInfo.dbSetInfo);
            }
            entities = this.PerformFilter(entities, getInfo.filterInfo, getInfo.dbSetInfo);
            entities = this.PerformSort(entities, getInfo.sortInfo);
            entities = this.GetPage(entities, getInfo.pageIndex, getInfo.pageSize, getInfo.pageCount, getInfo.dbSetInfo);
            return entities;
        }

        public T GetRefreshedEntity<T>(IQueryable<T> entities, RefreshRowInfo info)
             where T : class
        {
            object[] keyValue = info.rowInfo.GetPKValues(this._dataHelper);
            object dbEntity = QueryHelperClass.FindEntity(entities, info.rowInfo, keyValue);
            return (T)dbEntity;
        }

        public int? GetTotalCount<T>(IQueryable<T> entities, FilterInfo filter, DbSetInfo dbSetInfo)
            where T : class
        {
            IQueryable filtered_entities = this.PerformFilter<T>(entities, filter, dbSetInfo);
            return filtered_entities.Count();
        }

        public static string GetWherePKPredicate(RowInfo rowInfo)
        {
            DbSetInfo dbSetInfo = rowInfo.dbSetInfo;
            FieldInfo[] pkFieldsInfo = dbSetInfo.GetPKFieldInfos();
            StringBuilder sb = new StringBuilder();
            for (int i = 0; i < pkFieldsInfo.Length; ++i)
            {
                if (i > 0)
                    sb.Append(" and ");
                sb.AppendFormat("{0}=@{1}", pkFieldsInfo[i].fieldName, i);
            }
            string predicate = sb.ToString();
            return predicate;
        }

    }
}
