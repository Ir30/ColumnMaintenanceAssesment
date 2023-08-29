using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ColumnMaintenanceAssesment_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]


    public class TableController : Controller
    {
        private readonly ColumnMaintenanceDbContext dbContext;
        private readonly TableInterface tableInterface;

        public TableController(ColumnMaintenanceDbContext dbContext,TableInterface tableInterface)
        {
            this.dbContext = dbContext;
            this.tableInterface = tableInterface;
        }

        [HttpGet]
        public async Task<IActionResult> getAllTables()
        {
            try
            {
                var tables = await dbContext.Aotables.ToListAsync();
                return Ok(tables);
            }catch (Exception ex)
            {
                return BadRequest(ex.Message);
            } 
        }

        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> getColumnsByTable([FromRoute] Guid id)
        {
            try
            {
                var columns = await tableInterface.getColumnByTable(id);
                return Ok(columns);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("getAllTableNames")]
        public async Task<IActionResult> getAllTableNames()
        {
            try
            {
                var names = await tableInterface.getTableNames();
                return Ok(names);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
        //[HttpPost]
        //public async Task<IActionResult> AddAllTableNames()
        //{
        //    try
        //    {
        //        var names = await tableInterface.getTableNames();mu
        //        return Ok(names);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }
        //}
    }
}
