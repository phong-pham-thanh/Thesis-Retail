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
    public class BillController
    {
        private IBillService _billService;

        public BillController(IBillService billService)
        {
            _billService = billService;
        }

        [HttpGet]
        public List<BillModel> GetAll()
        {

            List<BillModel> ressult = _billService.GetAll();
            return ressult;
        }

        [HttpPost]
        [Route("addBill")]
        public bool AddBill([FromBody] BillModel newBill)
        {
            // {
            //     "billModel": {
            //         "CustomerId": 2,
            //         "WareHouseId": 3,
            //         "TotalAmount": 200,
            //         "UserId": 1,
            //         "ListBillDetails": []
            //     },
            //     "listBillDetailModels": [
            //         {
            //             "BillId": 4,
            //             "ProductId": 4,
            //             "Quantity": 15
            //         },
            //         {
            //             "BillId": 4,
            //             "ProductId": 5,
            //             "Quantity": 16
            //         }
            //     ]
            // }
            return _billService.AddBill(newBill);
        }
    }
}
