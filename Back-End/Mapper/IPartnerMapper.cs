using APIBackEnd.Data;
using APIBackEnd.Models;

namespace APIBackEnd.Mapper
{
    public interface IPartnerMapper
    {
        public PartnerModel ToModel(Partners efObject);
        public List<PartnerModel> ToModels(List<Partners> efObject);
    }
}
