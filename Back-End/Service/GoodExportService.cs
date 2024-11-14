﻿using APIBackEnd.Data;
using APIBackend.Models;
using APIBackend.Mapper;
using APIBackEnd.Mapper;
using APIBackend.DataModel;
using APIBackend.Repository;
using APIBackEnd.Models;
using APIBackEnd.Repository;
using APIBackEnd.Data.Enum;
using NGO.Core.Repositories;

namespace APIBackend.Service
{
    public interface IGoodExportService
    {
        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, bool autoAccept);
        public List<GoodsExportModel> GetAllGoodExports();
        public List<GoodsExportModel> GetAllGoodExportsByRole();
        public GoodsExportModel GetGoodExportById(int id);
        public GoodsExportModel AcceptGoodExport(int id);
        public GoodsExportModel UpdateGoodExport(int id, GoodsExportModel updateItem);
    }
    public class GoodExportService : IGoodExportService
    {
        private readonly IProductMapper _productMapper;
        private readonly IWareHouseRepository _wareHouseRepository;
        private readonly IGoodsExportMapper _goodExportMapper;
        private readonly IGoodExportDetailMapper _goodExportDetailMapper;
        private readonly IGoodExportRepository _goodExportRepository;
        private readonly IGoodExportDetailRepository _goodExportDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;
        private readonly IUserSessionService _userSessionService;
        private readonly IUserWareHouseService _userWareHouseService;

        public GoodExportService(IProductMapper productMapper, 
            IGoodsExportMapper goodExportMapper,
            IWareHouseRepository wareHouseRepository,
            IGoodExportDetailMapper goodExportDetailMapper, 
            IGoodExportRepository goodExportRepository,
            IGoodExportDetailRepository goodExportDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory,
            IUserWareHouseService userWareHouseService,
            IUserSessionService userSessionService)
        {
            _productMapper = productMapper;
            _wareHouseRepository = wareHouseRepository;
            _goodExportMapper = goodExportMapper;
            _goodExportDetailMapper = goodExportDetailMapper;
            _goodExportRepository = goodExportRepository;
            _goodExportDetailRepository = goodExportDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _uowFactory = uowFactory;
            _userSessionService = userSessionService;
            _userWareHouseService = userWareHouseService;
        }

        public bool AddGoodExport(GoodsExportModel goodsExportModel, List<GoodExportDetailModel> listGoodExportDetailModels, bool autoAccept)
        {
            using(var uow = _uowFactory.CreateUnityOfWork())
            {
                //Add good Export
                GoodsExport goodsExport = new GoodsExport();

                if (!autoAccept)
                {
                    goodsExportModel.ExportStatus = Status.Process;
                }
                else
                {
                    goodsExportModel.ExportStatus = Status.Success;
                }

                _goodExportMapper.ToEntity(goodsExport, goodsExportModel);
                GoodsExportModel newGoodExportModel = _goodExportMapper.ToModel(_goodExportRepository.AddGoodExport(goodsExport));


                //Add Good Export Details
                foreach (var goodExportDetailModel in listGoodExportDetailModels)
                {
                    GoodExportDetails goodExportDetails = new GoodExportDetails();
                    _goodExportDetailMapper.ToEntity(goodExportDetails, goodExportDetailModel);
                    goodExportDetails.GoodExportId = newGoodExportModel.Id;
                    _goodExportDetailRepository.AddGoodExportDetails(goodExportDetails);
                }

                if (autoAccept)
                {
                    GoodsExportModel newGoodExportModelWithFullDetails = _goodExportRepository.GetGoodExportById(newGoodExportModel.Id);
                    UpdateInventoryForGoodExport(newGoodExportModelWithFullDetails);
                }
                uow.Commit();
            }
            
            return true;
        }

        public GoodsExportModel UpdateGoodExport(int id, GoodsExportModel updateItem)
        {
            GoodsExportModel result = new GoodsExportModel();
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                result = _goodExportRepository.UpdateGoodExport(id, updateItem);

                _goodExportDetailRepository.DeleteListGoodExportDetailByGoodExportId(updateItem.Id);
                _goodExportDetailRepository.AddListGoodExportDetails(updateItem.ListGoodExportDetailsModel);
                uow.Commit();
            }
            return result;
        }

        public GoodsExportModel GetGoodExportById(int id)
        {
            GoodsExportModel result = _goodExportRepository.GetGoodExportById(id);
            foreach(GoodExportDetailModel detail in result.ListGoodExportDetailsModel)
            {
                detail.Product = _productRepository.GetProductById(detail.ProductId);
            }
            return result;
        }

        public List<GoodsExportModel> GetAllGoodExports()
        {
            List<GoodsExportModel> listGoodExport = _goodExportRepository.GetAllGoodExports();
            listGoodExport = listGoodExport.OrderByDescending(x => x.ExportStatus).ToList();
            bindWareHouseToGoodNote(listGoodExport);
            return listGoodExport;
        }

        public List<GoodsExportModel> GetAllGoodExportsByRole()
        {
            List<GoodsExportModel> listGoodExport = _goodExportRepository.GetAllGoodExports();
            List<int> listIdWareHouseBelong = _userWareHouseService.GetListWareHouseCurrentUserBelong();
            listGoodExport = listGoodExport.Where(x => listIdWareHouseBelong.Contains(x.WareHouseId)).ToList();
            listGoodExport = listGoodExport.OrderByDescending(x => x.ExportStatus).ToList();
            bindWareHouseToGoodNote(listGoodExport);
            return listGoodExport;
        }

        public GoodsExportModel AcceptGoodExport(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsExportModel result = _goodExportRepository.AcceptGoodExport(id);
                UpdateInventoryForGoodExport(result);
                uow.Commit();
                return result;
            }
        }

        public void UpdateInventoryForGoodExport(GoodsExportModel currentGoodExport)
        {
            foreach(var goodExportDetailModel in currentGoodExport.ListGoodExportDetailsModel)
            {
                _inventoryRepository.UpdateInventory(goodExportDetailModel.ProductId, goodExportDetailModel.Quantity, currentGoodExport.WareHouseId, false);
            }
        }

        public void bindWareHouseToGoodNote(List<GoodsExportModel> listGoodExport)
        {
            foreach(GoodsExportModel item in listGoodExport)
            {
                item.WareHouse = _wareHouseRepository.GetById(item.WareHouseId);
            }
        }

    }
}
