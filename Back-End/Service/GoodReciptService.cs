﻿using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Repository;
using NGO.Core.Repositories;

namespace APIBackend.Service
{
    public interface IGoodReciptService
    {
        public bool AddGoodRecipt(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels);
        public List<GoodsReceiptModel> GetAllGoodRecipts();
        public GoodsReceiptModel GetGoodReciptById(int id);
        public GoodsReceiptModel AcceptGoodReceipt(int id);
    }
    public class GoodReciptService : IGoodReciptService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsReceiptMapper _goodReciptMapper;
        private readonly IGoodReciptDetailMapper _goodReciptDetailMapper;
        private readonly IGoodReciptRepository _goodReciptRepository;
        private readonly IGoodReciptDetailRepository _goodReciptDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;

        public GoodReciptService(IProductMapper productMapper, 
            IGoodsReceiptMapper goodReciptMapper, 
            IGoodReciptDetailMapper goodReciptDetailMapper, 
            IGoodReciptRepository goodReciptRepository,
            IGoodReciptDetailRepository goodReciptDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory)
        {
            _productMapper = productMapper;
            _goodReciptMapper = goodReciptMapper;
            _goodReciptDetailMapper = goodReciptDetailMapper;
            _goodReciptRepository = goodReciptRepository;
            _goodReciptDetailRepository = goodReciptDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _uowFactory = uowFactory;
        }

        public bool AddGoodRecipt(GoodsReceiptModel goodsReceiptModel, List<GoodReceiptDetailModel> listGoodReceiptDetailModels)
        {
            //Add good recipt
            GoodsReceipt goodsReceipt = new GoodsReceipt();
            int totalAmount = 0;
            foreach(GoodReceiptDetailModel goodReceiptDetailModel in listGoodReceiptDetailModels)
            {
                totalAmount += goodReceiptDetailModel.PriceUnit * goodReceiptDetailModel.Quantity;
            }
            goodsReceiptModel.TotalAmount = totalAmount;
            _goodReciptMapper.ToEntity(goodsReceipt, goodsReceiptModel);

            GoodsReceiptModel newGoodReciptModel = _goodReciptMapper.ToModel(_goodReciptRepository.AddGoodRecipt(goodsReceipt));


            //Add Good Recipt Details
            foreach(var goodReceiptDetailModel in listGoodReceiptDetailModels)
            {
                GoodReceiptDetails goodReciptDetails = new GoodReceiptDetails();
                _goodReciptDetailMapper.ToEntity(goodReciptDetails, goodReceiptDetailModel);
                goodReciptDetails.GoodReceiptId = newGoodReciptModel.Id;
                _goodReciptDetailRepository.AddGoodReciptDetails(goodReciptDetails);

                //Update Inventory in ware house
                // _inventoryRepository.UpdateInventory(goodReceiptDetailModel.ProductId, goodReceiptDetailModel.Quantity, idWareHouse, true);
            }
            

            return true;
        }

        public List<GoodsReceiptModel> GetAllGoodRecipts()
        {
            return _goodReciptRepository.GetAllGoodRecipts();
        }

        public GoodsReceiptModel GetGoodReciptById(int id)
        {
            GoodsReceiptModel result = _goodReciptRepository.GetGoodReciptById(id);
            if (result == null) return null;

            foreach(GoodReceiptDetailModel item in result.ListGoodReciptDetailsModel)
            {
                item.Product = _productRepository.GetProductById(item.ProductId);
            }
            return result;
        }

        public GoodsReceiptModel AcceptGoodReceipt(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsReceiptModel result = _goodReciptRepository.AcceptGoodRecipt(id);
                UpdateInventoryForGoodRecipt(result);
                uow.Commit();
                return result;
            }
        }

        public void UpdateInventoryForGoodRecipt(GoodsReceiptModel currentGoodReceipt)
        {
            foreach(var goodExportDetailModel in currentGoodReceipt.ListGoodReciptDetailsModel)
            {
                _inventoryRepository.UpdateInventory(goodExportDetailModel.ProductId, goodExportDetailModel.Quantity, currentGoodReceipt.WareHouseId, true);
            }
        }
    }
}
