﻿using RIAPP.DataService;
using RIAPP.DataService.LinqSql;
using RIAPP.DataService.Types;
using RIAppDemo.BLL.Models;
using RIAppDemo.BLL.Utils;
using RIAppDemo.DAL;
using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Data.Linq;
using System.Data.SqlClient;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Transactions;
using System.Xml.Linq;
using System.Threading.Tasks;


namespace RIAppDemo.BLL.DataServices
{
    [Authorize()]
    public class RIAppDemoService : LinqForSqlDomainService<RIAppDemoDataContext>
    {
        private DbConnection _connection;
        private const string USERS_ROLE = "Users";
        private const string ADMINS_ROLE = "Admins";

        public RIAppDemoService(IServiceArgs args)
            : base(args)
        {
            //it allows getting information via GetCSharp, GetXAML, GetTypeScript
            //it should be set to false in release version 
            //allow it only at development time
            this.IsCodeGenEnabled = true;
        }

        protected override RIAppDemoDataContext CreateDataContext()
        {
            if (this._connection == null)
                this._connection = DBConnectionFactory.GetRIAppDemoConnection();
            var db = new RIAppDemoDataContext(this._connection);
            return db;
        }

        /// <summary>
        /// this is a helper method which can be used to create xaml metadata from the data.linq entities
        /// this xaml can be later copied and pasted as metadata in the WPF user control
        /// this XAML is a raw version and it is needed to be corrected,
        /// but it is faster than to type all this XAML from the start in the code editor
        /// </summary>
        protected override string GetXAML()
        {
            var metadata = base.GetMetadata();
            var xaml = System.Windows.Markup.XamlWriter.Save(metadata);
            XNamespace data = "clr-namespace:RIAPP.DataService.Types;assembly=RIAPP.DataService";
            XNamespace dal = "clr-namespace:RIAppDemo.DAL;assembly=RIAppDemo.DAL";

            XElement xtree = XElement.Parse(xaml);
            foreach (XElement el in xtree.DescendantsAndSelf())
            {
                el.Name = data.GetName(el.Name.LocalName);
                if (el.Name.LocalName == "Metadata")
                {
                    List<XAttribute> atList = el.Attributes().Where((e)=> e.IsNamespaceDeclaration && e.Name.LocalName == "xmlns").ToList();
                    atList.ForEach((attr) => { el.Attributes(attr.Name).Remove(); });
                }
                else if (el.Name.LocalName == "DbSetInfo")
                {
                    XAttribute entityTypeAttr = el.Attributes().Where(a => a.Name.LocalName == "EntityType").First();
                    entityTypeAttr.Value = string.Format("{{x:Type {0}}}", entityTypeAttr.Value);
                }

            }
            xtree.Add(new XAttribute(XNamespace.Xmlns + "data", "clr-namespace:RIAPP.DataService.Types;assembly=RIAPP.DataService"));
            return xtree.ToString();
        }

        protected override Metadata GetMetadata()
        {
           //returns raw (uncorrected) metadata generated from linq for sql DbContext
           //return base.GetMetadata();

           //returns corrected metadata
           return (Metadata)(new RIAppDemoMetadata().Resources["MainDemo"]);
        }

        #region Product
        [Query]
        public Task<QueryResult<LookUpProduct>> ReadProductLookUp()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.Products, this.CurrentQueryInfo, ref totalCount).Select(p => new LookUpProduct { ProductID = p.ProductID, Name = p.Name }).AsEnumerable();
            var queryResult = new QueryResult<LookUpProduct>(res, totalCount);
            return Task.FromResult(queryResult);
        }

        /// <summary>
        /// The method can be asynchronous if instead of QueryResult<Product> type
        /// you return Task<QueryResult<Product>>
        /// the demo shows the asynchronous variant
        /// </summary>
        /// <param name="param1"></param>
        /// <param name="param2"></param>
        /// <returns></returns>
        [Query]
        public async Task<QueryResult<Product>> ReadProduct(int[] param1, string param2)
        {
            int? totalCount = null;
            //the async delay is for the demo purposes to make it more  complex
            //await Task.Delay(250).ConfigureAwait(false);

            //another async part (simulate async query execution)
            var products = await Task.Run<IQueryable<Product>>(() =>
            {
                return this.QueryHelper.PerformQuery(this.DB.Products, this.CurrentQueryInfo, ref totalCount);
            }).ConfigureAwait(false);

            var productsArr = products.ToArray();
            var productIDs = productsArr.Select(p => p.ProductID).Distinct().ToArray();
            var queryResult = new QueryResult<Product>(productsArr, totalCount);

            //the last async part
            var subResult = await Task.Run<SubResult>(() =>
            {
                return new SubResult() { dbSetName = "SalesOrderDetail", Result = this.DB.SalesOrderDetails.Where(sod => productIDs.Contains(sod.ProductID)) };
            }).ConfigureAwait(false);

            //include related SalesOrderDetails with the products in the same query result
            queryResult.subResults.Add(subResult);
           //example of returning out of band information and use it on the client (of it can be more useful than it)
            queryResult.extraInfo = new { test = "ReadProduct Extra Info: " + DateTime.Now.ToString("dd.MM.yyyy HH:mm:ss") };
            return queryResult;
        }

        [Query]
        public QueryResult<Product> ReadProductByIds(int[] productIDs)
        {
            int? totalCount = null;
            var res = this.DB.Products.Where(ca => productIDs.Contains(ca.ProductID));
            return new QueryResult<Product>(res, totalCount);
        }

        /// <summary>
        /// The method can be asynchronous if instead of IEnumerable<ValidationErrorInfo> type
        /// you return Task<IEnumerable<ValidationErrorInfo>>
        /// the demo shows the asynchronous variant
        /// </summary>
        /// <param name="product"></param>
        /// <param name="modifiedField"></param>
        /// <returns></returns>
        public Task<IEnumerable<ValidationErrorInfo>> ValidateProduct(Product product, string[] modifiedField)
        {
            LinkedList<ValidationErrorInfo> errors = new LinkedList<ValidationErrorInfo>();
            if (Array.IndexOf(modifiedField,"Name") >-1 && product.Name.StartsWith("Ugly",StringComparison.OrdinalIgnoreCase))
                errors.AddLast(new ValidationErrorInfo{ fieldName="Name", message="Ugly name" });
            if (Array.IndexOf(modifiedField, "Weight") > -1 && product.Weight > 20000)
                errors.AddLast(new ValidationErrorInfo { fieldName = "Weight", message = "Weight must be less than 20000" });
            if (Array.IndexOf(modifiedField, "SellEndDate") > -1 && product.SellEndDate < product.SellStartDate)
                errors.AddLast(new ValidationErrorInfo { fieldName = "SellEndDate", message = "SellEndDate must be after SellStartDate" });
            if (Array.IndexOf(modifiedField, "SellStartDate") > -1 && product.SellStartDate > DateTime.Today)
                errors.AddLast(new ValidationErrorInfo { fieldName = "SellStartDate", message = "SellStartDate must be prior today" });

            return Task.FromResult<IEnumerable<ValidationErrorInfo>>(errors);
        }

        [Authorize(Roles = new string[]{ADMINS_ROLE})]
        public void InsertProduct(Product product)
        {
            product.ModifiedDate = DateTime.Now;
            product.rowguid = Guid.NewGuid();
            this.DB.Products.InsertOnSubmit(product);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateProduct(Product product)
        {
            Product orig = this.GetOriginal<Product>();
            this.DB.Products.Attach(product, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteProduct(Product product)
        {
            this.DB.Products.Attach(product);
            this.DB.Products.DeleteOnSubmit(product);
        }

        /// <summary>
        /// This is just a demo that you can return Task<Product> type from this method
        /// instead of simply returning the Product type
        /// </summary>
        /// <param name="refreshInfo"></param>
        /// <returns>Product or Task<Product></returns>
        public Task<Product> RefreshProduct(RefreshInfo refreshInfo)
        {
            return Task.Run<Product>(() =>
            {
                return this.QueryHelper.GetRefreshedEntity<Product>(this.DB.Products, refreshInfo);
            });
        }
        #endregion

        #region Customer
        [Query]
        public QueryResult<Customer> ReadCustomer(bool? includeNav)
        {
            string[] includeHierarchy = new string[0];
            if (includeNav == true)
            {
                DataLoadOptions opt = new DataLoadOptions();
                opt.LoadWith<Customer>(m => m.CustomerAddresses);
                opt.LoadWith<CustomerAddress>(m => m.Address);
                this.DB.LoadOptions = opt;

                //we can conditionally include entity hierarchy into results
                //making the path navigations decisions on the server enhances security
                //we can not trust clients to define navigation's expansions because it can influence the server performance
                //and is not good from the security considerations
                includeHierarchy = new string[] { "CustomerAddresses.Address" };
            }
            var customers = this.DB.Customers as IQueryable<Customer>;

            //AddressCount does not exists in Database (we calculate it), so it is needed to sort it manually
            var addressCountSortItem = this.CurrentQueryInfo.sortInfo.sortItems.FirstOrDefault((sortItem) => sortItem.fieldName == "AddressCount");
            if (addressCountSortItem != null)
            {
                this.CurrentQueryInfo.sortInfo.sortItems.Remove(addressCountSortItem);
                if (addressCountSortItem.sortOrder == RIAPP.DataService.Types.SortOrder.ASC)
                    customers = customers.OrderBy(c => c.CustomerAddresses.Count());
                else
                    customers = customers.OrderByDescending(c => c.CustomerAddresses.Count());
            }

            //perform query
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(customers, this.CurrentQueryInfo, ref totalCount).ToList();

            //if we preloaded customer addresses then update server side calculated field: AddressCount 
            //(which i introduced for testing purposes)
            if (includeNav == true)
            {
                res.ForEach((customer) =>
                {
                    customer.AddressCount = customer.CustomerAddresses.Count();
                });
            }

            //return result
            return new QueryResult<Customer>(result: res, totalCount: totalCount, includeNavigations: includeHierarchy);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void InsertCustomer(Customer customer)
        {
            customer.PasswordHash = "";
            customer.PasswordSalt = "";
            customer.ModifiedDate = DateTime.Now;
            customer.rowguid = Guid.NewGuid();
            this.DB.Customers.InsertOnSubmit(customer);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateCustomer(Customer customer)
        {
            Customer orig = this.GetOriginal<Customer>();
            this.DB.Customers.Attach(customer, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteCustomer(Customer customer)
        {
            this.DB.Customers.Attach(customer);
            this.DB.Customers.DeleteOnSubmit(customer);
        }

        public Customer RefreshCustomer(RefreshInfo refreshInfo)
        {
            return this.QueryHelper.GetRefreshedEntity<Customer>(this.DB.Customers, refreshInfo);
        }

        public IEnumerable<ValidationErrorInfo> ValidateCustomer(Customer customer, string[] modifiedField)
        {
            LinkedList<ValidationErrorInfo> errors = new LinkedList<ValidationErrorInfo>();
            if (Array.IndexOf(modifiedField, "ComplexProp.ComplexProp.Phone") > -1 && customer.ComplexProp.ComplexProp.Phone != null && customer.ComplexProp.ComplexProp.Phone.StartsWith("000", StringComparison.OrdinalIgnoreCase))
                errors.AddLast(new ValidationErrorInfo { fieldName = "ComplexProp.ComplexProp.Phone", message = "Phone number must not start with 000!" });

            return errors;
        }
        #endregion

        #region Address
        [Query]
        public QueryResult<Address> ReadAddress()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.Addresses, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<Address>(res, totalCount);
        }

        [Query]
        public QueryResult<Address> ReadAddressByIds(int[] addressIDs)
        {
            int? totalCount = null;
            var res = this.DB.Addresses.Where(ca => addressIDs.Contains(ca.AddressID));
            return new QueryResult<Address>(res, totalCount);
        }

        public IEnumerable<ValidationErrorInfo>  ValidateAddress(Address address, string[] modifiedField)
        {
            LinkedList<ValidationErrorInfo> errors = new LinkedList<ValidationErrorInfo>();
            return errors;
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void InsertAddress(Address address)
        {
            address.ModifiedDate = DateTime.Now;
            address.rowguid = Guid.NewGuid();
            this.DB.Addresses.InsertOnSubmit(address);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateAddress(Address address)
        {
            var orig = this.GetOriginal<Address>();
            this.DB.Addresses.Attach(address, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteAddress(Address address)
        {
            this.DB.Addresses.Attach(address);
            this.DB.Addresses.DeleteOnSubmit(address);
        }
        #endregion

        #region CustomerAddress
        [Query]
        public QueryResult<CustomerAddress> ReadCustomerAddress()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.CustomerAddresses, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<CustomerAddress>(res, totalCount);
        }

        [Query]
        public QueryResult<CustomerAddress> ReadAddressForCustomers(int[] custIDs)
        {
            int? totalCount = null;
            var res = this.DB.CustomerAddresses.Where(ca => custIDs.Contains(ca.CustomerID));
            return new QueryResult<CustomerAddress>(res, totalCount);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void InsertCustomerAddress(CustomerAddress customerAddress)
        {
            customerAddress.ModifiedDate = DateTime.Now;
            customerAddress.rowguid = Guid.NewGuid();
            this.DB.CustomerAddresses.InsertOnSubmit(customerAddress);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateCustomerAddress(CustomerAddress customerAddress)
        {
            CustomerAddress orig = this.GetOriginal<CustomerAddress>();
            this.DB.CustomerAddresses.Attach(customerAddress, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteCustomerAddress(CustomerAddress customerAddress)
        {
            this.DB.CustomerAddresses.Attach(customerAddress);
            this.DB.CustomerAddresses.DeleteOnSubmit(customerAddress);
        }
        #endregion

        #region SalesOrderHeader
        [Query]
        public QueryResult<SalesOrderHeader> ReadSalesOrderHeader()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.SalesOrderHeaders, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<SalesOrderHeader>(res, totalCount);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void InsertSalesOrderHeader(SalesOrderHeader soHeader)
        {
            soHeader.ModifiedDate = DateTime.Now;
            soHeader.rowguid = Guid.NewGuid();
            this.DB.SalesOrderHeaders.InsertOnSubmit(soHeader);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateSalesOrderHeader(SalesOrderHeader soHeader)
        {
            SalesOrderHeader orig = this.GetOriginal<SalesOrderHeader>();
            this.DB.SalesOrderHeaders.Attach(soHeader, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteSalesOrderHeader(SalesOrderHeader soHeader)
        {
            this.DB.SalesOrderHeaders.Attach(soHeader);
            this.DB.SalesOrderHeaders.DeleteOnSubmit(soHeader);
        }
        #endregion

        #region SalesOrderDetail
       
        [Query]
        public QueryResult<SalesOrderDetail> ReadSalesOrderDetail()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.SalesOrderDetails, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<SalesOrderDetail>(res, totalCount);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void InsertSalesOrderDetail(SalesOrderDetail soDetail)
        {
            soDetail.ModifiedDate = DateTime.Now;
            soDetail.rowguid = Guid.NewGuid();
            this.DB.SalesOrderDetails.InsertOnSubmit(soDetail);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void UpdateSalesOrderDetail(SalesOrderDetail soDetail)
        {
            SalesOrderDetail orig = this.GetOriginal<SalesOrderDetail>();
            this.DB.SalesOrderDetails.Attach(soDetail, orig);
        }

        [Authorize(Roles = new string[] { ADMINS_ROLE })]
        public void DeleteSalesOrderDetail(SalesOrderDetail soDetail)
        {
            this.DB.SalesOrderDetails.Attach(soDetail);
            this.DB.SalesOrderDetails.DeleteOnSubmit(soDetail);
        }
        #endregion

        [AllowAnonymous()]
        [Query]
        public QueryResult<ProductCategory> ReadProductCategory()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.ProductCategories, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<ProductCategory>(res, totalCount);
        }

        [AllowAnonymous()]
        [Query]
        public QueryResult<ProductModel> ReadProductModel()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.ProductModels, this.CurrentQueryInfo, ref totalCount).AsEnumerable();
            return new QueryResult<ProductModel>(res, totalCount);
        }

        [Query]
        public QueryResult<SalesInfo> ReadSalesInfo()
        {
            string startsWithVal =  this.CurrentQueryInfo.filterInfo.filterItems[0].values.First().TrimEnd('%');
            var res = this.DB.Customers.Where(c => c.SalesPerson.StartsWith(startsWithVal)).Select(s => s.SalesPerson).Distinct().Select(s => new SalesInfo { SalesPerson = s });
            var res2 = res.Skip(this.CurrentQueryInfo.pageIndex * this.CurrentQueryInfo.pageSize).Take(this.CurrentQueryInfo.pageSize).ToArray();
            return new QueryResult<SalesInfo>(res2, res.Count());
        }

        [Query]
        public QueryResult<AddressInfo> ReadAddressInfo()
        {
            int? totalCount = null;
            var res = this.QueryHelper.PerformQuery(this.DB.Addresses, this.CurrentQueryInfo, ref totalCount).Select(a => new AddressInfo { AddressID = a.AddressID, AddressLine1 = a.AddressLine1, City = a.City, CountryRegion = a.CountryRegion }).AsEnumerable();
            return new QueryResult<AddressInfo>(res, totalCount);
        }
        
        /// <summary>
        /// if you return Task<SomeType> result from the Invoke method then it will be asynchronous
        /// if instead you return SomeType type then the method will be executed synchronously
        /// here i use the asynchronous variant for demo purposes only!
        /// </summary>
        /// <param name="param1"></param>
        /// <param name="param2"></param>
        /// <returns></returns>
        [Invoke()]
        public Task<string> TestInvoke(byte[] param1, string param2)
        {
            return Task.Run<string>(() =>
            {
                StringBuilder sb = new StringBuilder();

                Array.ForEach(param1, (item) =>
                {
                    if (sb.Length > 0)
                        sb.Append(", ");
                    sb.Append(item);
                });

                /*
                int rand = (new Random(DateTime.Now.Millisecond)).Next(0, 999);
                if ((rand % 3) == 0)
                    throw new Exception("Error generated randomly for testing purposes. Don't worry! Try again.");
                */

                return string.Format("TestInvoke method invoked with<br/><br/><b>param1:</b> {0}<br/> <b>param2:</b> {1}", sb, param2);
            });
        }

        [Invoke()]
        public void TestComplexInvoke(AddressInfo info, KeyVal[] keys)
        {
            //p.s. do something with info and keys
        }

        #region Helper Methods
        public string GetThumbnail(int id, System.IO.Stream strm)
        {
            string fileName = this.DB.Products.Where(a => a.ProductID == id).Select(a => a.ThumbnailPhotoFileName).FirstOrDefault();
            if (string.IsNullOrEmpty(fileName))
                return "";
            System.Transactions.TransactionOptions top = new System.Transactions.TransactionOptions();
            top.Timeout = TimeSpan.FromSeconds(60);
            top.IsolationLevel = System.Transactions.IsolationLevel.Serializable;

            using (TransactionScope scope = new TransactionScope(TransactionScopeOption.Required, top))
            using (DbConnection conn = DBConnectionFactory.GetRIAppDemoConnection())
            {
                byte[] bytes = new byte[64 * 1024];

                string fldname = "ThumbNailPhoto";
                BlobStream bstrm = new BlobStream(conn as SqlConnection, "[SalesLT].[Product]", fldname, string.Format("WHERE [ProductID]={0}", id));
                bstrm.Open();
                int cnt = bstrm.Read(bytes, 0, bytes.Length);
                while (cnt > 0)
                {
                    strm.Write(bytes, 0, cnt);
                    cnt = bstrm.Read(bytes, 0, bytes.Length);
                }
                bstrm.Close();
                scope.Complete();
            }
            return fileName;
        }

        public void SaveThumbnail(int id, string fileName, System.IO.Stream strm)
        {
            var product = this.DB.Products.Where(a => a.ProductID == id).FirstOrDefault();
            if (product == null)
                throw new Exception("Product is not found");

            TransactionOptions topts = new System.Transactions.TransactionOptions();
            topts.Timeout = TimeSpan.FromSeconds(60);
            topts.IsolationLevel = System.Transactions.IsolationLevel.Serializable;
            using (TransactionScope trxScope = new TransactionScope(TransactionScopeOption.Required, topts))
            using (DbConnection conn = DBConnectionFactory.GetRIAppDemoConnection())
            {
                System.IO.BinaryReader br = new System.IO.BinaryReader(strm);
                byte[] bytes = br.ReadBytes(64 * 1024);
                string fldname = "ThumbNailPhoto";
                BlobStream bstrm = new BlobStream(conn as SqlConnection, "[SalesLT].[Product]", fldname, string.Format("WHERE [ProductID]={0}", id));
                bstrm.InitColumn();
                bstrm.Open();
                while (bytes != null && bytes.Length > 0)
                {
                    bstrm.Write(bytes, 0, bytes.Length);
                    bytes = br.ReadBytes(64 * 1024); ;
                }
                bstrm.Close();
                br.Close();
                trxScope.Complete();
            }

            product.ThumbnailPhotoFileName = fileName;
            this.DB.SubmitChanges();
        }

        public void SaveThumbnail2(int id, string fileName, Func<System.IO.Stream, Task> copy)
        {
            var product = this.DB.Products.Where(a => a.ProductID == id).FirstOrDefault();
            if (product == null)
                throw new Exception("Product is not found");

            TransactionOptions topts = new System.Transactions.TransactionOptions();
            topts.Timeout = TimeSpan.FromSeconds(60);
            topts.IsolationLevel = System.Transactions.IsolationLevel.Serializable;
            using (TransactionScope trxScope = new TransactionScope(TransactionScopeOption.Required, topts))
            using (DbConnection conn = DBConnectionFactory.GetRIAppDemoConnection())
            {
                string fldname = "ThumbNailPhoto";
                BlobStream bstrm = new BlobStream(conn as SqlConnection, "[SalesLT].[Product]", fldname, string.Format("WHERE [ProductID]={0}", id));
                bstrm.InitColumn();
                bstrm.Open();
                try
                {
                    if (!copy(bstrm).Wait(10000))
                        throw new Exception("Write stream timeout");
                }
                finally
                {
                    bstrm.Close();
                }
                trxScope.Complete();
            }

            product.ThumbnailPhotoFileName = fileName;
            this.DB.SubmitChanges();
        }
        #endregion

        //store last diffgram here
        private string _diffGramm;

        /// <summary>
        /// here can be tracked changes to the entities
        /// for example: product entity changes is tracked and can be seen here
        /// </summary>
        /// <param name="dbSetName"></param>
        /// <param name="changeType"></param>
        /// <param name="diffgram"></param>
        protected override void OnTrackChange(string dbSetName, ChangeType changeType, string diffgram)
        {
            //you can set a breakpoint here and to examine diffgram
            this._diffGramm = diffgram;
        }

        /// <summary>
        /// this types will be autogenerated in typescript when clients will use GetTypeScript method of the data service
        /// </summary>
        /// <returns></returns>
        protected override IEnumerable<Type> GetClientTypes()
        {
            return new Type[] { typeof(TestModel), typeof(KeyVal), typeof(StrKeyVal), typeof(RadioVal), typeof(HistoryItem), typeof(TestEnum2) };
        }

        /// <summary>
        /// Error logging could be implemented here
        /// </summary>
        /// <param name="ex"></param>
        protected override void OnError(Exception ex)
        {

        }

        protected override void Dispose(bool isDisposing)
        {
            if (this._connection != null)
            {
                this._connection.Close();
                this._connection = null;
            }
           
            base.Dispose(isDisposing);
        }
    }
}
