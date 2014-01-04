using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace RIAppDemo.DAL
{
    public class CustomerLvl1
    {
        protected internal Customer _owner;
        private CustomerLvl2 _lvl2;
        private string _FirstName;
        private string _MiddleName;
        private string _LastName;

        public CustomerLvl1(Customer owner)
        {
            this._owner = owner;
            this._FirstName = this._owner.FirstName;
            this._LastName = this._owner.LastName;
            this._MiddleName = this._owner.MiddleName;
            this._lvl2 = new CustomerLvl2(this);
        }

        public string FirstName
        {
            get
            {
                return this._FirstName;
            }
            set
            {
                this._FirstName = value;
            }
        }

        public string MiddleName
        {
            get
            {
                return this._MiddleName;
            }
            set
            {
                this._MiddleName = value;
            }
        }

        public string LastName
        {
            get
            {
                return this._LastName;
            }
            set
            {
                this._LastName = value;
            }
        }

        public CustomerLvl2 ComplexProp
        {
            get
            {
                return this._lvl2;
            }
        }
    }

    public class CustomerLvl2
    {
        private CustomerLvl1 _owner;
        private string _phone;
        private string _email;

        public CustomerLvl2(CustomerLvl1 owner)
        {
            this._owner = owner;
            this._phone = this._owner._owner.Phone;
            this._email = this._owner._owner.EmailAddress;
        }

        public string EmailAddress
        {
            get
            {
                return this._email;
            }
            set
            {
                this._email = value;
            }
        }

        public string Phone
        {
            get
            {
                return this._phone;
            }
            set
            {
                this._phone = value;
                //to test refresh after update, uncomment the lines beneath
                /*
                if (this._phone != null && this._phone.StartsWith("888"))
                    this._phone = this._phone.Replace('8', '#');
                */
            }
        }
    }

    public partial class Customer
    {
        private CustomerLvl1 _lvl1;

        partial void OnCreated()
        {
            this._lvl1 = new CustomerLvl1(this);
        }

        partial void OnLoaded()
        {
            this._lvl1 = new CustomerLvl1(this);
        }

        public CustomerLvl1 ComplexProp
        {
            get
            {
                return this._lvl1;
            }
        }
    }
}
