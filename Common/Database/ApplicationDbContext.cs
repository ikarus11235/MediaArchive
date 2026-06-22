using Common.Database.Model;
using Microsoft.EntityFrameworkCore;
using System.Reflection.Metadata;

namespace Common.Database
{
    public class ApplicationDbContext : DbContext
    {
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("_connectionString");
        }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Header>().HasKey(q => q.Id);
            modelBuilder.Entity<Header>()
                .HasMany(e => e.Seasons)
                .WithOne(e => e.Header)
                .HasForeignKey(e => e.HeaderId)
                .IsRequired();

            modelBuilder.Entity<Season>().HasKey(q => q.Id);
            modelBuilder.Entity<Season>()
                .HasMany(e => e.Episodes)
                .WithOne(e => e.Season)
                .HasForeignKey(e => e.SeasonId)
                .IsRequired();

            modelBuilder.Entity<Episode>().HasKey(q => q.Id);
            modelBuilder.Entity<Episode>()
                .HasMany(e => e.Pictures)
                .WithOne(e => e.Episode)
                .HasForeignKey(e => e.EpisodeId)
                .IsRequired();

            modelBuilder.Entity<Tag>().HasKey(q => q.Id);
        }
    }
}
