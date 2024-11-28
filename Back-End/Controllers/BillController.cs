using APIBackend.Models;
using APIBackEnd.Models;
using APIBackEnd.Data;
using APIBackend.Service;
using Microsoft.AspNetCore.Mvc;
using APIBackEnd.Controllers;

namespace APIBackend.Controllers
{

    public class paramAddNewBill
    {
        public BillModel billModel { get; set; }
        public List<BillDetailModel> listBillDetailModels { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class BillController : ControllerBase
    {
        private IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        [HttpGet]
        [Route("getAllByRole")]
        public List<BillModel> GetAllByRole()
        {

            List<BillModel> ressult = _billService.GetAllByRole();
            return ressult;
        }

        [HttpPost]
        [Route("addBill")]
        public BillModel AddBill([FromBody] BillModel newBill)
        {
            return _billService.AddBill(newBill);
        }

        [HttpGet]
        [Route("download/{id}")]
        public IActionResult DownloadBill(int id)
        {
            //return _billService.PrintBill(id);

            var fileBytes = _billService.PrintBill(id);
            string fileName = "ImportTemplate.docx";
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);
        }
    }
}
