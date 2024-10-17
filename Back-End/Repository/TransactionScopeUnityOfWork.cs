using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;

namespace NGO.Core.Repositories
{
    public class TransactionScopeUnityOfWork : IUnityOfWork
    {
        private bool disposed = false;
        protected readonly TransactionScope transactionScope;

        public TransactionScopeUnityOfWork(IsolationLevel isolationLevel)
        {
            this.transactionScope = new TransactionScope(
                TransactionScopeOption.Required,
                new TransactionOptions
                {
                    IsolationLevel = isolationLevel,
                    Timeout = TransactionManager.MaximumTimeout
                },
                TransactionScopeAsyncFlowOption.Enabled);
        }

        public virtual void Commit()
        {
            this.transactionScope.Complete();
        }

        public virtual void Dispose()
        {
            this.Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    this.transactionScope.Dispose();
                }
                this.disposed = true;
            }
        }
    }
}
