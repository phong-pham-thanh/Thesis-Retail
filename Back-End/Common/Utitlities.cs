using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;
using System;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Text.RegularExpressions;

public static class Utilities
{
    public static void ValidateDuplicate<T>(List<T> list, object entity, int? id = null, string columnName = "Name") where T : class
    {
        if (entity == null)
        {
            throw new ArgumentNullException(nameof(entity), "Entity cannot be null.");
        }

        // Lấy giá trị của thuộc tính "Name" từ đối tượng
        var entityType = entity.GetType();
        var nameProperty = entityType.GetProperty(columnName);

        if (nameProperty == null)
        {
            throw new ArgumentException($"Property '{columnName}' not found on entity '{entityType.Name}'.");
        }

        var nameValue = nameProperty.GetValue(entity)?.ToString();

        if (string.IsNullOrEmpty(nameValue))
        {
            throw new ArgumentException($"The value of '{columnName}' cannot be null or empty.");
        }

        // Tạo điều kiện kiểm tra sự tồn tại của "Name"
        Func<T, bool> condition;

        if (id != null)
        {
            // Lấy thuộc tính "Id"
            var idProperty = entityType.GetProperty("Id");
            if (idProperty == null)
            {
                throw new ArgumentException("The entity does not have an 'Id' property.");
            }

            // Kiểm tra trùng lặp, bỏ qua thực thể có id hiện tại
            condition = item =>
            {
                var itemName = nameProperty.GetValue(item)?.ToString();
                var itemId = idProperty.GetValue(item);

                return itemName == nameValue && !itemId.Equals(id.Value);
            };
        }
        else
        {
            // Nếu id == null, chỉ kiểm tra "Name"
            condition = item =>
            {
                var itemName = nameProperty.GetValue(item)?.ToString();
                return itemName == nameValue;
            };
        }

        // Kiểm tra xem có bản ghi nào thỏa mãn điều kiện không
        bool exists = list.Any(condition);

        if (exists)
        {
            string objectDuplicate = columnName != "Name" ? columnName : "Tên";
            throw new InvalidOperationException($"Đối tượng với '{columnName}' '{nameValue}' đã tồn tại.");
        }
    }

    public static string ToUrlFriendly(string input)
    {
        // Chuyển sang chữ thường
        input = input.ToLowerInvariant();

        // Loại bỏ dấu tiếng Việt
        input = RemoveDiacritics(input);

        // Thay khoảng trắng và các ký tự đặc biệt bằng dấu gạch ngang
        input = Regex.Replace(input, @"[^a-z0-9\s-]", ""); // Loại bỏ các ký tự đặc biệt
        input = Regex.Replace(input, @"\s+", "-"); // Thay khoảng trắng bằng dấu gạch ngang
        input = Regex.Replace(input, @"-+", "-"); // Loại bỏ dấu gạch ngang thừa

        return input.Trim('-'); // Loại bỏ dấu gạch ngang ở đầu và cuối chuỗi
    }

    private static string RemoveDiacritics(string text)
    {
        var normalizedString = text.Normalize(NormalizationForm.FormD);
        var stringBuilder = new StringBuilder();

        foreach (var c in normalizedString)
        {
            var unicodeCategory = CharUnicodeInfo.GetUnicodeCategory(c);
            if (unicodeCategory != UnicodeCategory.NonSpacingMark)
            {
                stringBuilder.Append(c);
            }
        }

        return stringBuilder.ToString().Normalize(NormalizationForm.FormC);
    }

    public static void ReplaceFieldWithId(MainDocumentPart mainPart, string fieldName, string replacement)
    {
        foreach (var text in mainPart.Document.Descendants<Text>())
        {
            if (!string.IsNullOrEmpty(text.Text) && text.Text.Contains($"<<{fieldName}>>"))
            {
                text.Text = text.Text.Replace($"<<{fieldName}>>", replacement);
            }
        }
    }

    public static void AddRowToBookmarkTableReceipt(MainDocumentPart mainPart, string bookmarkName, string productName, int quantity, int? price, int? toPrice)
    {
        var bookmarkStart = mainPart.Document.Body.Descendants<BookmarkStart>().FirstOrDefault(b => b.Name == bookmarkName);
        if (bookmarkStart != null)
        {
            var table = bookmarkStart.Ancestors<Table>().FirstOrDefault();
            if (table != null)
            {
                var newRow = new TableRow();
                var productCell = new TableCell(new Paragraph(new Run(new Text(productName))));
                newRow.Append(productCell);
                var quantityCell = new TableCell(new Paragraph(new Run(new Text(quantity.ToString()))));
                newRow.Append(quantityCell);
                TableCell priceCell;
                if (price.HasValue)
                {
                    priceCell = new TableCell(new Paragraph(new Run(new Text(price.Value.ToString("N0")))));
                }
                else
                {
                    priceCell = new TableCell(new Paragraph(new Run(new Text(""))));
                }
                TableCell toPriceCell;
                if (toPrice.HasValue)
                {
                    toPriceCell = new TableCell(new Paragraph(new Run(new Text(toPrice.Value.ToString("N0")))));
                }
                else
                {
                    toPriceCell = new TableCell(new Paragraph(new Run(new Text(""))));
                }
                newRow.Append(priceCell);
                newRow.Append(toPriceCell);
                table.Append(newRow);
            }
        }
    }

    public static void AddRowToBookmarkTableReceiptExport(MainDocumentPart mainPart, string bookmarkName, string productName, int quantity)
    {
        var bookmarkStart = mainPart.Document.Body.Descendants<BookmarkStart>().FirstOrDefault(b => b.Name == bookmarkName);
        if (bookmarkStart != null)
        {
            var table = bookmarkStart.Ancestors<Table>().FirstOrDefault();
            if (table != null)
            {
                var newRow = new TableRow();
                var productCell = new TableCell(new Paragraph(new Run(new Text(productName))));
                newRow.Append(productCell);
                var quantityCell = new TableCell(new Paragraph(new Run(new Text(quantity.ToString()))));
                newRow.Append(quantityCell);
                
                table.Append(newRow);
            }
        }
    }
}
