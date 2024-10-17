using APIBackEnd.Data;
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
    public interface IGoodTransferService
    {
        public bool AddGoodTransfer(GoodsTransferModel goodsTransferModel, List<GoodTransferDetailModel> listGoodTransferDetailModels, bool autoAccept);
        public List<GoodsTransferModel> GetAllGoodTransfers();
        public GoodsTransferModel GetGoodTransferById(int id);
        public GoodsTransferModel AcceptGoodTransfer(int id);
        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem);
    }
    public class GoodTransferService : IGoodTransferService
    {
        private readonly IProductMapper _productMapper;
        private readonly IGoodsTransferMapper _goodTransferMapper;
        private readonly IGoodTransferDetailMapper _goodTransferDetailMapper;
        private readonly IGoodTransferRepository _goodTransferRepository;
        private readonly IGoodTransferDetailRepository _goodTransferDetailRepository;
        private readonly IInventoryRepository _inventoryRepository;
        private readonly IProductRepository _productRepository;
        protected readonly IUnityOfWorkFactory _uowFactory;

        public GoodTransferService(IProductMapper productMapper, 
            IGoodsTransferMapper goodTransferMapper, 
            IGoodTransferDetailMapper goodTransferDetailMapper, 
            IGoodTransferRepository goodTransferRepository,
            IGoodTransferDetailRepository goodTransferDetailRepository,
            IInventoryRepository inventoryRepository,
            IProductRepository productRepository,
            IUnityOfWorkFactory uowFactory)
        {
            _productMapper = productMapper;
            _goodTransferMapper = goodTransferMapper;
            _goodTransferDetailMapper = goodTransferDetailMapper;
            _goodTransferRepository = goodTransferRepository;
            _goodTransferDetailRepository = goodTransferDetailRepository;
            _inventoryRepository = inventoryRepository;
            _productRepository = productRepository;
            _uowFactory = uowFactory;
        }

        public bool AddGoodTransfer(GoodsTransferModel goodsTransferModel, List<GoodTransferDetailModel> listGoodTransferDetailModels, bool autoAccept)
        {
            using(var uow = _uowFactory.CreateUnityOfWork())
            {
                //Add good Transfer
                GoodsTransfer goodsTransfer = new GoodsTransfer();

                if (!autoAccept)
                {
                    goodsTransferModel.Status = Status.Process;
                }
                else
                {
                    goodsTransferModel.Status = Status.Success;
                }

                _goodTransferMapper.ToEntity(goodsTransfer, goodsTransferModel);
                GoodsTransferModel newGoodTransferModel = _goodTransferMapper.ToModel(_goodTransferRepository.AddGoodTransfer(goodsTransfer));


                //Add Good Transfer Details
                foreach (var goodTransferDetailModel in listGoodTransferDetailModels)
                {
                    GoodTransferDetails goodTransferDetails = new GoodTransferDetails();
                    _goodTransferDetailMapper.ToEntity(goodTransferDetails, goodTransferDetailModel);
                    goodTransferDetails.GoodTransferId = newGoodTransferModel.Id;
                    _goodTransferDetailRepository.AddGoodTransferDetails(goodTransferDetails);
                }

                if (autoAccept)
                {
                    GoodsTransferModel newGoodTransferModelWithFullDetails = _goodTransferRepository.GetGoodTransferById(newGoodTransferModel.Id);
                    // UpdateInventoryForGoodTransfer(newGoodTransferModelWithFullDetails);
                }
                uow.Commit();
            }
            
            return true;
        }

        public GoodsTransferModel UpdateGoodTransfer(int id, GoodsTransferModel updateItem)
        {
            GoodsTransferModel result = new GoodsTransferModel();
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                result = _goodTransferRepository.UpdateGoodTransfer(id, updateItem);

                foreach (var goodTransferDetailModel in updateItem.ListGoodTransferDetailsModel)
                {
                    _goodTransferDetailRepository.UpdateGoodTransferDetails(goodTransferDetailModel.Id, goodTransferDetailModel);
                }
                uow.Commit();
            }
            return result;
        }

        public GoodsTransferModel GetGoodTransferById(int id)
        {
            GoodsTransferModel result = _goodTransferRepository.GetGoodTransferById(id);
            foreach(GoodTransferDetailModel detail in result.ListGoodTransferDetailsModel)
            {
                detail.Product = _productRepository.GetProductById(detail.ProductId);
            }
            return result;
        }

        public List<GoodsTransferModel> GetAllGoodTransfers()
        {
            List<GoodsTransferModel> listGoodTransfer = _goodTransferRepository.GetAllGoodTransfers();
            return listGoodTransfer;
        }

        public GoodsTransferModel AcceptGoodTransfer(int id)
        {
            using (var uow = _uowFactory.CreateUnityOfWork())
            {
                GoodsTransferModel result = _goodTransferRepository.AcceptGoodTransfer(id);
                // UpdateInventoryForGoodTransfer(result);
                uow.Commit();
                return result;
            }
        }

        // public void UpdateInventoryForGoodTransfer(GoodsTransferModel currentGoodTransfer)
        // {
        //     foreach(var goodTransferDetailModel in currentGoodTransfer.ListGoodTransferDetailsModel)
        //     {
        //         _inventoryRepository.UpdateInventory(goodTransferDetailModel.ProductId, goodTransferDetailModel.Quantity, currentGoodTransfer.WareHouseId, false);
        //     }
        // }

    }
}
