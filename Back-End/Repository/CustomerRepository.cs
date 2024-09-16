using APIBackend.Mapper;
using APIBackend.Models;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Models;

namespace APIBackEnd.Repository
{
    public interface ICustomerRepository
    {
        public List<CustomerModel> GetAll();
        public CustomerModel GetById(int id);
        public CustomerModel AddNewCustomer(CustomerModel CustomerModel);
        public CustomerModel UpdateCustomer(int id, CustomerModel CustomerModel);
    }
    public class CustomerRepository : ICustomerRepository
    {
        private readonly CoreContext _coreContext;
        private readonly ICustomerMapper _customerMapper;

        public CustomerRepository(CoreContext _context, ICustomerMapper customerMapper)
        {
            _coreContext = _context;
            _customerMapper = customerMapper;
        }

        public List<CustomerModel> GetAll()
        {
            List<Customers> customers = _coreContext.Customers.ToList();
            return _customerMapper.ToModels(customers);
        }

        public CustomerModel GetById(int id)
        {
            return _customerMapper.ToModel(_coreContext.Customers.Where(w => w.Id == id).FirstOrDefault());
        }

        public CustomerModel AddNewCustomer(CustomerModel CustomerModel)
        {
            Customers efobject = new Customers();
            _customerMapper.ToEntity(efobject, CustomerModel);
            _coreContext.Customers.Add(efobject);
            _coreContext.SaveChanges(true);
            return _customerMapper.ToModel(efobject);
        }
        public CustomerModel UpdateCustomer(int id, CustomerModel CustomerModel)
        {
            Customers CustomerDataBase = _coreContext.Customers.Where(ca => ca.Id == id).FirstOrDefault();
            if (CustomerDataBase == null)
            {
                return null;
            }
            _customerMapper.ToEntity(CustomerDataBase, CustomerModel);
            CustomerDataBase.Id = id;
            _coreContext.SaveChanges();
            return _customerMapper.ToModel(CustomerDataBase);
        }
    }
}
