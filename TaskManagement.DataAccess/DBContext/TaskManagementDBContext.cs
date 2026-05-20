using TaskManagement.DataAccess.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace TaskManagement.DataAccess.DBContext
{
    public class TaskManagementDBContext : DbContext
    {

        public TaskManagementDBContext()
        {

        }

        public TaskManagementDBContext(DbContextOptions<TaskManagementDBContext> options) : base(options)
        {

        }

        public DbSet<Models.User> Users { get; set; }
        public DbSet<Models.Role> Roles { get; set; }
        public DbSet<Models.Team> Teams { get; set; }
        public DbSet<Models.Task> Tasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {

            optionsBuilder.UseSqlServer("Server=DESKTOP-73FDPI4;Database=TaskManagement;Integrated Security=True;Persist Security Info=False;Pooling=False;MultipleActiveResultSets=False;Encrypt=False;TrustServerCertificate=True;");

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {

            modelBuilder.Entity<Role>(e =>
            {
                e.ToTable("Roles");
                e.HasKey(e => e.RoleId);
                e.Property(e => e.Name)
                    .IsRequired()
                    .HasMaxLength(50);
            });

            modelBuilder.Entity<User>(e =>
            {
                e.ToTable("Users");
                e.HasKey(e => e.UserId);
                e.Property(e => e.UserName)
                    .IsRequired()
                    .HasMaxLength(50);
                e.Property(e => e.Phone)
                    .HasMaxLength(11);
                e.Property(e => e.Email)
                    .IsRequired();
                e.HasIndex(e => e.UserName)
                    .IsUnique();
                e.HasIndex(e => e.Email)
                    .IsUnique();

                e.HasOne(e => e.Role)
                    .WithMany(r => r.Users)
                    .HasForeignKey(e => e.RoleId);

                e.HasOne(e => e.Team)
                    .WithMany(t => t.Users)
                    .HasForeignKey(e => e.TeamId);
            });

            modelBuilder.Entity<Team>(e =>
            {
                e.ToTable("Teams");
                e.HasKey(e => e.TeamId);
                e.Property(e => e.Name)
                    .IsRequired();
                e.HasIndex(e => e.Name)
                    .IsUnique();
            });

            modelBuilder.Entity<Models.Task>(e =>
            {
                e.ToTable("Tasks");
                e.HasKey(e => e.Id);
                e.Property(e => e.Title)
                    .IsRequired()
                    .HasMaxLength(100);
                e.Property(e => e.Description)
                    .HasMaxLength(1000);

                e.HasOne(e => e.User)
                    .WithMany(u => u.Tasks)
                    .HasForeignKey(e => e.UserId);
            });

            base.OnModelCreating(modelBuilder);
        }
    }
}
