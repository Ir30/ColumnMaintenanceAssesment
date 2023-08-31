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
                    var result =await columnInterface.addColumn(column);
                    if (result != null)
                    {
                        return Ok(result);
                    }
                    else
                    {
                        return NotFound();
                    }

                }else { return BadRequest(); }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
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
                    if (Column != null)
                    {

                        return Ok(Column);
                    }
                    else { return NotFound($"Column with id: {id} is not found"); }
                }
                else
                {
                    return BadRequest();
                }

            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        //Delete a record
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteColumn(Guid id)
        {
            try
            {
                var column = await columnInterface.DeleteColumn(id);
                if (column != null)
                {
                    return Ok("success");
                }
                return NotFound("not found");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
