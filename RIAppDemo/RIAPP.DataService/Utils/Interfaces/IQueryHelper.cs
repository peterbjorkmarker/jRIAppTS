using System;
namespace RIAPP.DataService.Utils
{
    public interface IQueryHelper
    {
        System.Linq.IQueryable<T> GetPage<T>(System.Linq.IQueryable<T> entities, int pageIndex, int pageSize, int pageCount, RIAPP.DataService.DbSetInfo dbInfo) where T : class;
        T GetRefreshedEntity<T>(System.Linq.IQueryable<T> entities, RIAPP.DataService.RefreshRowInfo info) where T : class;
        int? GetTotalCount<T>(System.Linq.IQueryable<T> entities, RIAPP.DataService.FilterInfo filter, RIAPP.DataService.DbSetInfo dbSetInfo) where T : class;
        System.Linq.IQueryable<T> PerformFilter<T>(System.Linq.IQueryable<T> entities, RIAPP.DataService.FilterInfo filter, RIAPP.DataService.DbSetInfo dbInfo) where T : class;
        System.Linq.IQueryable<T> PerformQuery<T>(System.Linq.IQueryable<T> entities, RIAPP.DataService.GetDataInfo queryInfo, ref int? totalCount) where T : class;
        System.Linq.IQueryable<T> PerformSort<T>(System.Linq.IQueryable<T> entities, RIAPP.DataService.SortInfo sort) where T : class;
    }
}
