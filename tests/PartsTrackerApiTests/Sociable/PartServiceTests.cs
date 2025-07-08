using FluentAssertions;
using NSubstitute;
using PartsTrackerApi.Application;
using PartsTrackerApi.Domain;

namespace PartsTrackerApiTests.Sociable;

[TestFixture]
public class PartServiceTests
{
    [Test]
    public async Task GetAllPartsAsync_ShouldReturnAllParts()
    {
        // arrange
        var myPartCollection = new List<Part>();
        var partsRepositoryMock = Substitute.For<IPartsRepository>();
        partsRepositoryMock.GetAllPartsAsync().Returns(myPartCollection);

        // act
        var partsService = new PartsService(partsRepositoryMock);
        var result = await partsService.GetAllPartsAsync();

        // assert
        result.Should().BeSameAs(myPartCollection);
    }
}

