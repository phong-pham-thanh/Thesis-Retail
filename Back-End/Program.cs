using Microsoft.EntityFrameworkCore;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Repository;
using APIBackend.Mapper;
using APIBackend.Service;
using APIBackend.Repository;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using NGO.Core.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

builder.Services.AddDbContext<CoreContext>(option => option.UseSqlServer(builder.Configuration.GetConnectionString("CoreContext")));

// Configure CORS
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins("http://localhost:9000") // Allow your React app's origin
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Repository
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IProductRepository, ProductRepository>();
builder.Services.AddScoped<IGoodReciptRepository, GoodsReciptRepository>();
builder.Services.AddScoped<IGoodReciptDetailRepository, GoodReciptDetailRepository>();
builder.Services.AddScoped<IPartnerRepository, PartnerRepository>();
builder.Services.AddScoped<IWareHouseRepository, WareHouseRepository>();
builder.Services.AddScoped<IInventoryRepository, InventoryRepository>();
builder.Services.AddScoped<ICategoryRepository, CategoryRepository>();
builder.Services.AddScoped<IWareHouseRepository, WareHouseRepository>();
builder.Services.AddScoped<IGoodExportRepository, GoodExportRepository>();
builder.Services.AddScoped<IGoodExportDetailRepository, GoodExportDetailRepository>();
builder.Services.AddScoped<ICustomerRepository, CustomerRepository>();
builder.Services.AddScoped<IPriceProductRepository, PriceProductRepository>();
builder.Services.AddScoped<IBillRepository, BillRepository>();
builder.Services.AddScoped<IBillDetailRepository, BillDetailRepository>();
builder.Services.AddScoped<IUnityOfWorkFactory, TransactionScopeUnityOfWorkFactory>();
// Mapper
builder.Services.AddScoped<IUserMapper, UserMapper>();
builder.Services.AddScoped<IProductMapper, ProductMapper>();
builder.Services.AddScoped<IGoodsReceiptMapper, GoodsReceiptMapper>();
builder.Services.AddScoped<IGoodReciptDetailMapper, GoodReciptDetailMapper>();
builder.Services.AddScoped<IGoodsIssueMapper, GoodsIssueMapper>();
builder.Services.AddScoped<IPartnerMapper, PartnerMapper>();
builder.Services.AddScoped<ICategoryMapper, CategoryMapper>();
builder.Services.AddScoped<IWareHouseMapper, WareHouseMapper>();
builder.Services.AddScoped<IInventoryMapper, InventoryMapper>();
builder.Services.AddScoped<IGoodExportDetailMapper, GoodExportDetailMapper>();
builder.Services.AddScoped<IGoodsExportMapper, GoodsExportMapper>();
builder.Services.AddScoped<ICustomerMapper, CustomerMapper>();
builder.Services.AddScoped<IPriceProductMapper, PriceProductMapper>();
builder.Services.AddScoped<IBillMapper, BillMapper>();
builder.Services.AddScoped<IBillDetailMapper, BillDetailMapper>();

// Service
builder.Services.AddScoped<IGoodReciptService, GoodReciptService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWareHouseService, WareHouseService>();
builder.Services.AddScoped<IPartnerService, PartnerService>();
builder.Services.AddScoped<IGoodExportService, GoodExportService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
builder.Services.AddScoped<IPriceProductService, PriceProductService>();
builder.Services.AddScoped<IBillService, BillService>();

var app = builder.Build();

// Exception handling
app.UseExceptionHandler(builder =>
{
    builder.Run(async context =>
    {
        var errorFeature = context.Features.Get<IExceptionHandlerFeature>();
        if (errorFeature != null)
        {
            var exception = errorFeature.Error;
            ProblemDetails problemDetails = new ProblemDetails
            {
                Instance = context.Request.Path,
                Title = "An error occurred while processing your request."
            };

            if (exception is ArgumentNullException)
            {
                problemDetails.Status = 400; // Bad Request
                problemDetails.Title = "Bad Request";
                problemDetails.Detail = exception.Message;
            }
            else if (exception is InvalidOperationException)
            {
                problemDetails.Status = 409; // Conflict
                problemDetails.Title = "Conflict";
                problemDetails.Detail = exception.Message;
            }
            else if (exception is KeyNotFoundException)
            {
                problemDetails.Status = 404; // Not Found
                problemDetails.Title = "Not Found";
                problemDetails.Detail = exception.Message;
            }
            else
            {
                problemDetails.Status = 500; // Internal Server Error
                problemDetails.Title = "Internal Server Error";
                problemDetails.Detail = "An unexpected error occurred. Please try again later.";
            }

            context.Response.StatusCode = problemDetails.Status ?? 500;
            context.Response.ContentType = "application/problem+json";

            await context.Response.WriteAsJsonAsync(problemDetails);
        }
    });
});

app.UseRouting();

// Use CORS after routing but before authorization or session
app.UseCors();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseSession();
app.MapControllers();
app.Run();
