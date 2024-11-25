using Global_Tech_API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Global_Tech_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly ApplicationDbContext _ApplicationDbContext;

        public EmployeeController(ApplicationDbContext ApplicationDbContext)
        {
            _ApplicationDbContext = ApplicationDbContext;
        }

        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Employee>>> GetEmployees()
        {
            var employees = await _ApplicationDbContext.Employees.ToListAsync();
            return Ok(employees);
        }
        
        //[HttpGet("{EmpId}")]
        //public async Task<ActionResult<IEnumerable<Employee>>> GetEmployeeById(int EmpId)
        //{
            
        //        var employee = await _ApplicationDbContext.Employees.FirstOrDefaultAsync(e => e.EmpId == EmpId);
        //        if (employee == null)
        //        {
        //            return NotFound("Employee not found");
        //        }
        //        return Ok(employee);
      

        //}
       

        [HttpPost]
        public async Task<ActionResult<Employee>> AddEmployee([FromBody] Employee objEmployee)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState); // Return validation errors
            }
            if (await _ApplicationDbContext.Employees.AnyAsync(e => e.EmpId == objEmployee.EmpId))
            {
                return Conflict("An employee with this ID already exists.");
            }
            _ApplicationDbContext.Employees.Add(objEmployee);
            await _ApplicationDbContext.SaveChangesAsync();
            return CreatedAtAction(nameof(GetEmployees), new { id = objEmployee.EmpId }, objEmployee);
        }

       
        [HttpPut("updateData/{Id}")]
        public async Task<IActionResult> UpdateEmployee(int Id, [FromBody] Employee objEmployee)
        {

            var existingEmployee = await _ApplicationDbContext.Employees.FirstOrDefaultAsync(e => e.Id == Id);
            if (existingEmployee == null)
            {
                return NotFound("Employee not Found");
            }
            existingEmployee.EmpId = objEmployee.EmpId;
            existingEmployee.Name = objEmployee.Name;
            existingEmployee.Role = objEmployee.Role;
            existingEmployee.Email = objEmployee.Email;
            existingEmployee.Gender = objEmployee.Gender;
            existingEmployee.DOB = objEmployee.DOB;
            existingEmployee.Address = objEmployee.Address;
            existingEmployee.PhoneNo = objEmployee.PhoneNo;

            await _ApplicationDbContext.SaveChangesAsync();

            return Ok(existingEmployee);
        }

       

        [HttpDelete("deleteData/{Id}")]
        public async Task<IActionResult> DeleteEmployee(int Id)
        {
            var employee = await _ApplicationDbContext.Employees.FirstOrDefaultAsync(e => e.Id == Id);
            if (employee == null)
            {
                return NotFound(new { message = "Employee not found" });
            }

            _ApplicationDbContext.Employees.Remove(employee);
            await _ApplicationDbContext.SaveChangesAsync();
            return Ok(new { message="Record Deleted succussfully" });
        }
    }
}

