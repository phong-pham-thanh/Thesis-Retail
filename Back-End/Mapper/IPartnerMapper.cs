using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public interface IPartnerMapper
    {
        public PartnerModel ToModel(Partners efObject);
        public List<PartnerModel> ToModels(List<Partners> efObject);
    }
}
