using System.ComponentModel.DataAnnotations;

namespace Global_Tech_API.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; } = 0;
        public required int EmpId { get; set; }
        public required string Name { get; set; }
        public required string Role { get; set; }
        public required string Email { get; set; }
        public required string Gender { get; set; }
        public required DateOnly DOB { get; set; }
        public required string Address { get; set; } 
        public required long PhoneNo { get; set; }
    }
}
