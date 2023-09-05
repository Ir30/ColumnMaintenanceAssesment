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
        private readonly TableInterface tableInterface;

        public TableController(TableInterface tableInterface)
        {
            this.tableInterface = tableInterface;
        }


        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetColumnsByTableId([FromRoute] Guid id)
        {
            try
            {
                var columns = await tableInterface.GetColumnByTable(id);
                return Ok(columns);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("getAllTableNames")]
        public async Task<IActionResult> GetAllTableNames()
        {
            try
            {
                var names = await tableInterface.GetTableNames();
                return Ok(names);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
