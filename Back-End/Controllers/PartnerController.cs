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

        [HttpGet]
        [Route("getPartnerById")]
        public PartnerModel GetById(int id)
        {
            return _partnerService.GetById(id);
        }

        [HttpPost]
        [Route("addNewPartner")]
        public PartnerModel AddNewPartner([FromBody] PartnerModel partner)
        {
            return _partnerService.AddNewPartner(partner);
        }

        [HttpPut]
        [Route("updatePartnerById/{id}")]
        public PartnerModel Put(int id, [FromBody] PartnerModel partner)
        {
            return _partnerService.UpdatePartner(id, partner);
        }
    }
}
