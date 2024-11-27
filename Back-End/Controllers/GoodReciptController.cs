using Microsoft.AspNetCore.Mvc;
using System;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackend.Repository;
using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Service;
using Syncfusion.DocIO.DLS;
using Syncfusion.DocIORenderer;
using Syncfusion.Pdf;
using Syncfusion.DocIO;


namespace APIBackEnd.Controllers
{
    public class paramAddNewGoodRecipt
    {
        public GoodsReceiptModel goodsReceiptModel { get; set; }
        public List<GoodReceiptDetailModel> listGoodReceiptDetailModels { get; set; }
    }

    [Route("[controller]")]
    [ApiController]
    public class GoodReciptController : ControllerBase
    {
        private IGoodReciptService _goodReciptService;

        public GoodReciptController(IGoodReciptService goodReciptService)
        {
            _goodReciptService = goodReciptService;
        }
        [HttpGet]
        [Route("GetAllGoodReciptsByRole")]
        public List<GoodsReceiptModel> GetAllGoodReciptsByRole()
        {
            return _goodReciptService.GetAllGoodReciptsByRole();
        }

        [HttpGet]
        [Route("getGoodReciptBydId/{id}")]
        public GoodsReceiptModel GetGoodReciptById(int id)
        {
            return _goodReciptService.GetGoodReciptById(id);
        }

        [HttpPost]
        [Route("addGoodRecipt")]
        public bool AddGoodRecipt([FromBody] paramAddNewGoodRecipt param)
        {
            return _goodReciptService.AddGoodRecipt(param.goodsReceiptModel, param.listGoodReceiptDetailModels, autoAccept: false);
        }

        [HttpGet]
        [Route("acceptGoodRecipt/{id}")]
        public GoodsReceiptModel AcceptGoodReceipt(int id)
        {
            return _goodReciptService.AcceptGoodReceipt(id);
        }

        [HttpPut]
        [Route("updateGoodReceipt/{id}")]
        public GoodsReceiptModel EditGoodReceipt(int id, [FromBody] GoodsReceiptModel goodsReceiptModel)
        {
            return _goodReciptService.UpdateGoodReceipt(id, goodsReceiptModel);
        }

        [HttpGet]
        [Route("deleteItem/{id}")]
        public bool DeleteGoodReceipt(int id)
        {
            return _goodReciptService.RemoveGoodReceipt(id);
        }

        [HttpGet]
        [Route("download/{id}")]
        public IActionResult PrintGoodReceipt(int id)
        {
            var fileBytes = _goodReciptService.PrintGoodReceipt(id);
            string fileName = "ImportTemplate.docx";
            return File(fileBytes, "application/vnd.openxmlformats-officedocument.wordprocessingml.document", fileName);

            // var fileBytes = _goodReciptService.PrintGoodReceipt(id);

            //// Tạo file PDF từ byte[] của Word
            //using (var memoryStream = new MemoryStream(fileBytes))
            //using (var wordDocument = new WordDocument(memoryStream, FormatType.Docx)) // Load tài liệu Word
            //using (var renderer = new DocIORenderer())
            //using (var pdfStream = new MemoryStream())
            //{
            //    // Chuyển đổi Word sang PDF
            //    PdfDocument pdfDocument = renderer.ConvertToPDF(wordDocument);
            //    pdfDocument.Save(pdfStream); // Lưu nội dung PDF vào MemoryStream
            //    pdfDocument.Close(); // Giải phóng tài nguyên

            //    pdfStream.Position = 0; // Đặt lại vị trí stream để tải xuống

            //    // Trả về file PDF
            //    string pdfFileName = "ImportTemplate.pdf";
            //    return File(pdfStream.ToArray(), "application/pdf", pdfFileName);
            //}
        }
    }
}
