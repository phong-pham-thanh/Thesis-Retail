using APIBackend.Mapper;
using APIBackend.Models;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackEnd.Repository;

namespace APIBackend.Service
{
    public interface ICustomerService
    {
        public List<CustomerModel> GetAll();
        public CustomerModel GetById(int id);
        public CustomerModel AddNewCustomer(CustomerModel CustomerModel);
        public CustomerModel UpdateCustomer(int id, CustomerModel CustomerModel);
        public List<CustomerModel> GetBySearchName(string query);

    }

    public class CustomerService : ICustomerService
    {
        private readonly ICustomerRepository _customerRepository;
        public CustomerService(ICustomerRepository customerRepository) 
        {
            _customerRepository = customerRepository;
        }
        public List<CustomerModel> GetAll()
        {
            return _customerRepository.GetAll();
        }

        public CustomerModel GetById(int id)
        {
            return _customerRepository.GetById(id);
        }

        public CustomerModel AddNewCustomer(CustomerModel CustomerModel)
        {
            return _customerRepository.AddNewCustomer(CustomerModel);
        }

        public CustomerModel UpdateCustomer(int id, CustomerModel CustomerModel)
        {
            return _customerRepository.UpdateCustomer(id, CustomerModel);
        }

        public List<CustomerModel> GetBySearchName(string query)
        {
            return _customerRepository.GetBySearchName(query);
        }
    }
}
