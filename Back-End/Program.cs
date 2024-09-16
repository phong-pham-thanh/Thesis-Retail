using Microsoft.EntityFrameworkCore;
using APIBackEnd.Data;
using APIBackEnd.Mapper;
using APIBackEnd.Repository;
using APIBackend.Mapper;
using APIBackend.Service;
using APIBackend.Repository;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession();

builder.Services.AddCors(option => option.AddDefaultPolicy(policy => policy.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod()));
builder.Services.AddDbContext<CoreContext>( option => option.UseSqlServer(builder.Configuration.GetConnectionString("CoreContext")));
//Repository
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


//Mapper
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

//Service
builder.Services.AddScoped<IGoodReciptService, GoodReciptService>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IWareHouseService, WareHouseService>();
builder.Services.AddScoped<IPartnerService, PartnerService>();
builder.Services.AddScoped<IGoodExportService, GoodExportService>();
builder.Services.AddScoped<ICustomerService, CustomerService>();
























builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:9000")
                   .AllowAnyHeader()
                   .AllowAnyMethod();
        });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();
app.UseSession();
app.MapControllers();
app.UseCors();
app.Run();
