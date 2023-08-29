using AutoMapper;
using ColumnMaintenanceAssesment_BackEnd.Dto;
using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Immutable;

namespace ColumnMaintenanceAssesment_BackEnd.Services
{
    public class TableService : TableInterface
    {
        private readonly IMapper mapper;
        private readonly ColumnMaintenanceDbContext dbContext;

        public TableService(IMapper mapper, ColumnMaintenanceDbContext dbContext)
        {
            this.mapper = mapper;
            this.dbContext = dbContext;
        }

        public async Task<IEnumerable<Aotable>> getColumnByTable(Guid id)
        {
            var columns = await dbContext.Aotables.Include(t=>t.Aocolumns).Where(t=>t.Id == id).ToListAsync();
            return columns;
        }

        public async Task<List<TableNamesWithIdDto>> getTableNames()
        {
            var tables = await dbContext.Aotables.ToListAsync();
    
            var tableDto = mapper.Map<List<TableNamesWithIdDto>>(tables);

            return tableDto;
        }
    }
}
