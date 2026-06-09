namespace TaskManagement.Business.Helpers
{
    public static class AuditHelper
    {
        public static void SetCreateAudit(dynamic entity, string currentUser)
        {
            entity.CreatedAt = DateTime.UtcNow;
            entity.UpdatedAt = DateTime.UtcNow;
            entity.CreatedBy = currentUser;
            entity.UpdatedBy = currentUser;
        }

        public static void SetUpdateAudit(dynamic entity, string currentUser)
        {
            entity.UpdatedAt = DateTime.UtcNow;
            entity.UpdatedBy = currentUser;
        }

    }
}
