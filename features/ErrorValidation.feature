Feature: Login Failed Validation

    @Validations
    Scenario Outline: Verify Error message is displayed after login
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed

        Examples:
            | username          | password    |
            | anshika@gmail.com | Iamking@000 |


