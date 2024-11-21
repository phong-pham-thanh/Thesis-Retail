using Microsoft.AspNetCore.Mvc;
using APIBackend.Helpers;

namespace APIBackend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly string _uploadPath;
        private readonly string _baseUrl;

        public UploadController(IConfiguration configuration)
        {
            _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images/products");
            _baseUrl = configuration["ImageSettings:BaseUrlImage"];
        }

        [HttpPost("upload-image")]
        public async Task<IActionResult> UploadImage([FromForm] IFormFile file, [FromForm] string productName)
        {
            if (file == null || file.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            try
            {
                var imageUrl = await ImageHelper.ValidateAndProcessImageAsync(file, _uploadPath, productName);

                var fullPath = $"{_baseUrl}/{imageUrl}";
                return Ok(new { imageUrl, fullPath });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }
}
