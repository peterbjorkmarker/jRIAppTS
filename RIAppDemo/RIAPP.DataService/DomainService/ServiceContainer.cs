using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using RIAPP.DataService.Utils.Interfaces;
using RIAPP.DataService.Security;
using System.Security.Principal;
using RIAPP.DataService.Utils;

namespace RIAPP.DataService
{
    public class ServiceContainer : IServiceContainer
    {
        private ISerializer _serializer;
        private Lazy<IAuthorizer> _authorizer;
        private Lazy<IDataHelper> _dataHelper;
        private Lazy<IValidationHelper> _validationHelper;
        private Lazy<IQueryHelper> _queryHelper;
        private Lazy<IValueConverter> _converter;
        private IPrincipal _principal;
        private Type _dataServiceType;

        public ServiceContainer(ISerializer serializer, Type dataServiceType, IPrincipal principal)
        {
            this._serializer = serializer;
            this._principal = principal;
            this._dataServiceType = dataServiceType;
            this._authorizer = new Lazy<IAuthorizer>(() => this.CreateAuthorizer());
            this._dataHelper = new Lazy<IDataHelper>(() => this.CreateDataHelper());
            this._converter = new Lazy<IValueConverter>(() => this.CreateValueConverter());
            this._validationHelper = new Lazy<IValidationHelper>(() => this.CreateValidationHelper());
            this._queryHelper = new Lazy<IQueryHelper>(() => this.CreateQueryHelper());
        }

        public IAuthorizer Authorizer
        {
            get
            {
                return this._authorizer.Value;
            }
        }

        public ISerializer Serializer
        {
            get { return this._serializer; }
        }

        public IValueConverter ValueConverter
        {
            get { return this._converter.Value; }
        }

        public IDataHelper DataHelper
        {
            get
            {
                return this._dataHelper.Value;
            }
        }

        public IQueryHelper QueryHelper
        {
            get
            {
                return this._queryHelper.Value;
            }
        }

        public IValidationHelper ValidationHelper
        {
            get
            {
                return this._validationHelper.Value;
            }
        }

        protected virtual IAuthorizer CreateAuthorizer()
        {
            return new AuthorizerClass(this._dataServiceType, this._principal);
        }

        protected virtual IValueConverter CreateValueConverter()
        {
            return new ValueConverter(this);
        }

        protected virtual IDataHelper CreateDataHelper()
        {
            return new DataHelper(this);
        }

        protected virtual IValidationHelper CreateValidationHelper()
        {
            return new ValidationHelper(this);
        }

        protected virtual IQueryHelper CreateQueryHelper()
        {
            return new QueryHelper(this);
        }
    }
}
