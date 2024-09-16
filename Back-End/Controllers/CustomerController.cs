using APIBackend.Models;
using APIBackend.Service;
using APIBackEnd.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private ICustomerService _customerService;
        public CustomerController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        [HttpGet]
        public List<CustomerModel> GetAll()
        {
            return _customerService.GetAll();
        }

        [HttpGet]
        [Route("getCustomerById")]
        public CustomerModel GetById(int id)
        {
            return _customerService.GetById(id);
        }

        [HttpPost]
        [Route("addNewCustomer")]
        public CustomerModel AddNewCustomer([FromBody] CustomerModel Customer)
        {
            return _customerService.AddNewCustomer(Customer);
        }

        [HttpPut]
        [Route("updateCustomerById/{id}")]
        public CustomerModel Put(int id, [FromBody] CustomerModel Customer)
        {
            return _customerService.UpdateCustomer(id, Customer);
        }
    }
}
