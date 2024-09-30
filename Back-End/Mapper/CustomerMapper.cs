using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackend.Mapper
{
    public interface ICustomerMapper
    {
        public CustomerModel ToModel(Customers efObject);
        public List<CustomerModel> ToModels(List<Customers> efObjects);
        public void ToEntity(Customers efObject, CustomerModel modelObject);

    }
    public class CustomerMapper : ICustomerMapper
    {
        public CustomerModel ToModel(Customers efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            CustomerModel modelObject = new CustomerModel();
            modelObject.Id = efObject.Id;
            modelObject.Name = efObject.Name;
            modelObject.PhoneNumber = efObject.PhoneNumber;
            return modelObject;
        }

        public List<CustomerModel> ToModels(List<Customers> efObjects)
        {
            List<CustomerModel> result = new List<CustomerModel>();
            foreach (Customers item in efObjects)
            {
                CustomerModel modelObject = new CustomerModel();
                modelObject.Id = item.Id;
                modelObject.Name = item.Name;
                modelObject.PhoneNumber = item.PhoneNumber;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(Customers efObject, CustomerModel modelObject)
        {
            if (modelObject == null)
            {
                return;
            }
            efObject.Name = modelObject.Name;
            efObject.PhoneNumber = modelObject.PhoneNumber;
            return;
        }
    }
}
