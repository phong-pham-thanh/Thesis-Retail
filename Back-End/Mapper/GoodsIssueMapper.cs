using TestAPI.Data;
using TestAPI.Models;

namespace TestAPI.Mapper
{
    public class GoodsIssueMapper : IGoodsIssueMapper
    {
        public GoodsIssueMapper() { }
        public GoodsIssueModel ToModel(GoodsIssue efObject)
        {
            if (efObject == null)
            {
                return null;
            }
            GoodsIssueModel modelObject = new GoodsIssueModel();
            modelObject.Id = efObject.Id;
            modelObject.PartnerId = efObject.PartnerId;
            modelObject.IssueStatus = efObject.IssueStatus;
            modelObject.ImportDate = efObject.ImportDate;
            return modelObject;
        }

        public List<GoodsIssueModel> ToModels(List<GoodsIssue> efObjects)
        {
            List<GoodsIssueModel> result = new List<GoodsIssueModel>();
            foreach (GoodsIssue item in efObjects)
            {
                GoodsIssueModel modelObject = new GoodsIssueModel();
                modelObject.Id = item.Id;
                modelObject.PartnerId = item.PartnerId;
                modelObject.IssueStatus = item.IssueStatus;
                modelObject.ImportDate = item.ImportDate;
                result.Add(modelObject);
            }
            return result;
        }
    }
}
