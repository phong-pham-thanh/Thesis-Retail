using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IPartnerMapper
    {
        public PartnerModel ToModel(Partners efObject);
        public List<PartnerModel> ToModels(List<Partners> efObject);
        public void ToEntity(Partners efObject, PartnerModel domObject);
    }
    public class PartnerMapper : IPartnerMapper
    {
        public PartnerMapper() { }
        public PartnerModel ToModel(Partners efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            PartnerModel modelObject = new PartnerModel();
            modelObject.Id = efObject.Id;
            modelObject.Name = efObject.Name;
            modelObject.TotalSale = efObject.TotalSale;
            modelObject.PhoneNumber = efObject.PhoneNumber;
            return modelObject;
        }

        public List<PartnerModel> ToModels(List<Partners> efObjects)
        {
            List<PartnerModel> result = new List<PartnerModel>();
            foreach (Partners item in efObjects)
            {
                PartnerModel modelObject = new PartnerModel();
                modelObject.Id = item.Id;
                modelObject.Name = item.Name;
                modelObject.TotalSale = item.TotalSale;
                modelObject.PhoneNumber = item.PhoneNumber;
                result.Add(modelObject);
            }
            return result;
        }

        public void ToEntity(Partners efObject, PartnerModel domObject)
        {
            if(domObject == null) return;
            efObject.Name = domObject.Name;
            efObject.TotalSale = domObject.TotalSale;
            efObject.PhoneNumber = domObject.PhoneNumber;
        }
    }
}
