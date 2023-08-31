using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace ColumnMaintenanceAssesment_BackEnd.Services
{
    public class ColumnServices : ColumnInterface
    {

        private readonly ColumnMaintenanceDbContext dbContext;

        public ColumnServices(ColumnMaintenanceDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Aocolumn> addColumn(Aocolumn column)
        {
            await dbContext.Aocolumns.AddAsync(column);
            await dbContext.SaveChangesAsync();
            return column;
        }

        public async Task<Aocolumn> DeleteColumn(Guid id)
        {
            var column = await dbContext.Aocolumns.FindAsync(id);
            if (column != null)
            {
                dbContext.Aocolumns.Remove(column);
                await dbContext.SaveChangesAsync();
                return column;
            }
            return null;
        }

        public async Task<Aocolumn> EditColumn(Guid id, Aocolumn column)
        {
            var ColumnDetails = await dbContext.Aocolumns.SingleOrDefaultAsync(option => option.Id == id);
            if (ColumnDetails != null)
            {
                ColumnDetails.Id = column.Id;
                ColumnDetails.TableId = column.TableId;
                ColumnDetails.Name = column.Name;
                ColumnDetails.Description = column.Description;
                ColumnDetails.DataType = column.DataType;
                ColumnDetails.DataSize = column.DataSize;
                ColumnDetails.DataScale = column.DataScale;
                ColumnDetails.Comment = column.Comment;
                ColumnDetails.Encrypted = column.Encrypted;
                ColumnDetails.Distortion = column.Distortion;

                await dbContext.SaveChangesAsync();
                return column;
            }
            else { return null; }
        }
    }
}
