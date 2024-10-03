using APIBackend.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace NGO.Core.Repositories
{
    public class TransactionScopeUnityOfWorkFactory : IUnityOfWorkFactory
    {
        public virtual IUnityOfWork CreateUnityOfWork()
        {
            return new TransactionScopeUnityOfWork(IsolationLevel.ReadCommitted);
        }
    }
}
