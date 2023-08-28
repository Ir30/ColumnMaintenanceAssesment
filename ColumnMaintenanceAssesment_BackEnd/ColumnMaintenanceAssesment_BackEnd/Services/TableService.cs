using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace ColumnMaintenanceAssesment_BackEnd.Services
{
    public class TableService : TableInterface
    {
        private readonly ColumnMaintenanceDbContext dbContext;

        public TableService(ColumnMaintenanceDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Aotable>> getColumnByTable(Guid id)
        {
            var columns = await dbContext.Aotables.Include(t=>t.Aocolumns).Where(t=>t.Id == id).ToListAsync();
            return columns;
        }

        public async Task<List<string>> getTableNames()
        {
            var tables = await dbContext.Aotables.Select(t => t.Name).ToListAsync();
            return tables;
        }
    }
}
