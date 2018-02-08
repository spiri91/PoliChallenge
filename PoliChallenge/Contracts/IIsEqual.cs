namespace PoliChallenge.Contracts
{
    public interface IIsEqual<in T>
    {
        bool IsEqual(T comparator);
    }
}
