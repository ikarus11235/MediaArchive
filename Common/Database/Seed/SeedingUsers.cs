using Common.Database.Model.Enums;
using Common.Database.Model;

namespace Common.Database.Seed
{
    public static class SeedingUsers
    {
        public static List<User> SeedUsers()
        {
            var userList = new List<User>
            {
                new User { Id = -1, Email = "admin@archive.com", Password = "1234", Role = Roles.Admin },
                new User { Id = -2, Email = "dummy@archive.com", Password = "dummy", Role = Roles.User }
            };

            return userList;
        }
    }
}