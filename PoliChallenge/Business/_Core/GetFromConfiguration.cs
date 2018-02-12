namespace PoliChallenge.Business._Core
{
    public enum SettingsName
    {
        TotalHiScores = 0,
        Token,
        PersistentSave
    }

    public static class FromConfiguration
    {
        public static string Get(SettingsName name) => System.Configuration.ConfigurationManager.AppSettings[name.ToString()] ;
    }
}