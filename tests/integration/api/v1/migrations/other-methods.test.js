import database from "@/infra/database";

beforeAll(cleanDatabase);

async function cleanDatabase() {
  await database.query("DROP schema public CASCADE; CREATE schema public;");
}

async function testMethod(method) {
  const response = await fetch("http://localhost:3000/api/v1/migrations", {
    method,
  });

  return response.status;
}

async function getDatabaseStatus() {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const responseBody = await response.json();
  return responseBody;
}

test("Other HTTP methods to /api/v1/migrations should return 405", async () => {
  const notAllowedMethods = ["HEAD", "PUT", "PATCH", "DELETE"];

  for (const method of notAllowedMethods) {
    const responseStatus = await testMethod(method);
    expect(responseStatus).toBe(405);

    const databaseStatus = await getDatabaseStatus();
    expect(databaseStatus.dependencies.database.opened_connections).toEqual(1);
  }
});
