using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using MediaController.Controllers;
using Common.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using MediaController.DTOs;

namespace MediaController.Test
{
    [TestClass]
    public class DataControllerTest
    {
        private class InMemoryFactory : IDbContextFactory<ApplicationDbContext>
        {
            private readonly string _name;

            public InMemoryFactory(string name)
            {
                _name = name;
            }

            public ApplicationDbContext CreateDbContext()
            {
                var options = new DbContextOptionsBuilder<ApplicationDbContext>()
                    .UseInMemoryDatabase(_name)
                    .Options;

                var ctx = new ApplicationDbContext(options);
                // Ensure the model is created so HasData seeds are applied
                ctx.Database.EnsureCreated();
                return ctx;
            }
        }

        [TestMethod]
        public void GetFakeHeaders_ReturnsThree()
        {
            var factory = new InMemoryFactory(Guid.NewGuid().ToString());
            var controller = new DataController(factory);

            var result = controller.GetFakeHeaders();

            Assert.IsNotNull(result);
            var ok = result.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            if (ok != null)
            {
                var items = ok.Value as IEnumerable<HeaderDto>;
                Assert.IsNotNull(items);
                Assert.AreEqual(3, items.Count());
                return;
            }

            // If Value returned directly
            Assert.IsNotNull(result.Value);
            Assert.AreEqual(3, result.Value!.Count());
        }

        [TestMethod]
        public void GetHeaders_WithSeededData_ReturnsAtLeastOne()
        {
            var dbName = Guid.NewGuid().ToString();
            var factory = new InMemoryFactory(dbName);

            // create context and ensure seeded data from OnModelCreating is applied
            using (var ctx = factory.CreateDbContext())
            {
                // optionally add additional data
                if (!ctx.Set<Common.Database.Model.Header>().Any())
                {
                    ctx.Add(new Common.Database.Model.Header { Id = 100, Title = "TestHeader", ThumbNailPath = "" });
                    ctx.SaveChanges();
                }
            }

            var controller = new DataController(factory);
            var action = controller.GetHeaders();

            Assert.IsNotNull(action);
            var ok = action.Result as Microsoft.AspNetCore.Mvc.OkObjectResult;
            if (ok != null)
            {
                var headers = ok.Value as IEnumerable<HeaderDto>;
                Assert.IsNotNull(headers);
                Assert.IsTrue(headers.Any());
                return;
            }

            Assert.IsNotNull(action.Value);
            Assert.IsTrue(action.Value!.Any());
        }
    }
}
