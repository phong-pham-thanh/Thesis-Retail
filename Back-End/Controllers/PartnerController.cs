using APIBackend.Models;
using APIBackend.Service;
using APIBackEnd.Data;
using Microsoft.AspNetCore.Mvc;

namespace APIBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class PartnerController : ControllerBase
    {
        private IPartnerService _partnerService;
        public PartnerController(IPartnerService partnerService)
        {
            _partnerService = partnerService;
        }

        [HttpGet]
        public List<PartnerModel> GetAll()
        {
            return _partnerService.GetAll();
        }
    }
}
