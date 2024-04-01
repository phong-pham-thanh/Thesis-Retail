using TestAPI.Data;
using TestAPI.Mapper;
using TestAPI.Models;

namespace TestAPI.Repository
{
    public class IssueRepository : IGIssueRepository
    {
        private readonly CoreContext _coreContext;
        private readonly IGoodsIssueMapper _issueMapper;

        public IssueRepository(CoreContext _context, IGoodsIssueMapper IssueMapper)
        {
            _coreContext = _context;
            _issueMapper = IssueMapper;
        }

        public List<GoodsIssueModel> GetAllGoodsIssue()
        {
            List<GoodsIssue> goodsIssues = _coreContext.GoodsIssue.ToList();
            return _issueMapper.ToModels(goodsIssues);
        }
    }
}
