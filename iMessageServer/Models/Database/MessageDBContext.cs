using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace iMessageServer.Models.Database
{
    public class MessageDBContext : DbContext
    {
        public DbSet<Conversation> Conversations { get; set; }
        public DbSet<Message> Messages { get; set; }

        public MessageDBContext(DbContextOptions<MessageDBContext> options) : base(options)
        {
            
        }
    }
}
