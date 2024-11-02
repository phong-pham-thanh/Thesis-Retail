using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Processing;

namespace APIBackend.Helpers
{
    public static class ImageHelper
    {
        public static async Task<string> ValidateAndProcessImageAsync(IFormFile file, string uploadPath, string productName)
        {
            // Check size
            const int maxSizeInBytes = 2 * 1024 * 1024; // 2MB
            if (file.Length > maxSizeInBytes)
            {
                throw new Exception("File size exceeds 2MB limit.");
            }

            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var uploadDate = DateTime.UtcNow.ToString("yyyyMMdd");
            productName = !string.IsNullOrWhiteSpace(productName) ? productName.Replace(" ", "_") : "";
            var newFileName = $"{productName}_{uploadDate}.jpg";
            var filePath = Path.Combine(uploadPath, newFileName);

            // Resize va luu hinh anh
            using (var image = Image.Load(file.OpenReadStream()))
            {
                image.Mutate(x => x.Resize(960, 540));
                await image.SaveAsJpegAsync(filePath);
            }

            return newFileName;
        }
    }
}
