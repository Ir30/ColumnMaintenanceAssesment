using ColumnMaintenanceAssesment_BackEnd.Models;
using ColumnMaintenanceAssesment_BackEnd.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ColumnMaintenanceAssesment_BackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ColumnController : Controller
    {
        private readonly ColumnInterface columnInterface;

        public ColumnController( ColumnInterface columnInterface)
        {
            this.columnInterface = columnInterface;
        }

        //Add Column
        [HttpPost]
        public async Task<IActionResult> AddColumn([FromBody] Aocolumn column)
        {
            try
            {
                if (column != null) 
                {
                    column.Id = Guid.NewGuid();
                    var result =await columnInterface.AddColumn(column);
                    if (result != null)
                    {
                        return Ok("{\"status\":true}");
                    }
                    else
                    {
                        return NotFound("{\"status\":false}");
                    }

                }else { return BadRequest("{\"status\":false}"); }

            }
            catch (Exception ex)
            {
                return BadRequest( "{\"status\":false}");
            }
        }

        //Edit Column
        [HttpPut("{id}")]
        public async Task<IActionResult> EditColumn([FromRoute] Guid id, [FromBody] Aocolumn column)
        {
            try
            {
                if (column != null)
                {
                    var Column = await columnInterface.EditColumn(id, column);
                    if (Column)
                    {
                        return Ok("{\"status\":true}");
                    }
                    else { return NotFound("{\"status\":false}"); }
                }
                else
                {
                    return BadRequest("{\"status\":false}");
                }

            }
            catch (Exception ex)
            {
                return BadRequest("{\"status\":false}");
            }
        }

        //Delete a record
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteColumn(Guid id)
        {
            try
            {
                var column = await columnInterface.DeleteColumn(id);
                if (column)
                {
                    return Ok("{\"status\":true}");
                }
                return NotFound("{\"status\":false}");
            }
            catch (Exception)
            {
                return BadRequest("{\"status\":false}");
            }
        }

    }
}
