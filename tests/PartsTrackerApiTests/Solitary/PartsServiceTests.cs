using FluentAssertions;
using NSubstitute;
using PartsTrackerApi.Application;
using PartsTrackerApi.Domain;

namespace PartsTrackerApiTests.Solitary;

[TestFixture]
public class PartsServiceTests
{
    [SetUp]
    public void Setup()
    {
    }
    
    [Test]
    public void GivenNullPart_WhenDeletePart_ThenThrowArgumentNullException()
    {
        // arrange
        var partsRepositoryMock = Substitute.For<IPartsRepository>();
        var partsService = new PartsService(partsRepositoryMock);
        
        // act
        string partForDeletion = null;
        var act = () => partsService.DeletePartAsync(partForDeletion);
        
        // assert
        act.Should().ThrowAsync<ArgumentNullException>();
    }
}