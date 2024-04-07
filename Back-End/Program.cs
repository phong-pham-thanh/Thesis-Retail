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


//Mapper
builder.Services.AddScoped<IUserMapper, UserMapper>();
builder.Services.AddScoped<IProductMapper, ProductMapper>();
builder.Services.AddScoped<IGoodsReceiptMapper, GoodsReceiptMapper>();
builder.Services.AddScoped<IGoodReciptDetailMapper, GoodReciptDetailMapper>();
builder.Services.AddScoped<IGoodsIssueMapper, GoodsIssueMapper>();
builder.Services.AddScoped<IPartnerMapper, PartnerMapper>();

//Service
builder.Services.AddScoped<IGoodReciptService, GoodReciptService>();
builder.Services.AddScoped<IProductService, ProductService>();
























builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        builder =>
        {
            builder.WithOrigins("http://localhost:3000")
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
