using APIBackend.DataModel;
using APIBackend.Models;

namespace APIBackend.Mapper
{
    public interface IPriceProductMapper
    {
        public PriceProductModel ToModel(PriceProduct efObject);
        public List<PriceProductModel> ToModels(List<PriceProduct> efObjects);
        public void ToEntity(PriceProduct efObject, PriceProductModel domObject);
    }

    public class PriceProductMapper : IPriceProductMapper
    {
        public PriceProductModel ToModel(PriceProduct efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            PriceProductModel modelObject = new PriceProductModel();
            modelObject.Id = efObject.Id;
            modelObject.ProductId = efObject.ProductId;
            modelObject.Price = efObject.Price;
            modelObject.StartDate = efObject.StartDate;
            modelObject.EndDate = efObject.EndDate;
            modelObject.Active = efObject.Active;
            return modelObject;
        }

        public List<PriceProductModel> ToModels(List<PriceProduct> efObjects)
        {
            if (efObjects == null)
            {
                return null;
            }
            List<PriceProductModel> result = new List<PriceProductModel>();
            foreach (PriceProduct efObject in efObjects)
            {
                PriceProductModel modelObject = new PriceProductModel();
                modelObject.Id = efObject.Id;
                modelObject.ProductId = efObject.ProductId;
                modelObject.Price = efObject.Price;
                modelObject.StartDate = efObject.StartDate;
                modelObject.EndDate = efObject.EndDate;
                modelObject.Active = efObject.Active;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(PriceProduct efObject, PriceProductModel domObject)
        {
            if (domObject == null) return;
            efObject.Price = domObject.Price;
            efObject.ProductId = domObject.ProductId;
            efObject.StartDate = domObject.StartDate;
            efObject.EndDate = domObject.EndDate;
            efObject.Active = domObject.Active;
        }
    }
}
