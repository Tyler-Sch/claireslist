import pytest
from backend.server import create_app


@pytest.fixture
def app():
    app = create_app()
    app.config.from_object('backend.config.TestingConfig')
    return app

def test_example(app):
    response = app.test_client().get('/')
    assert response.status_code == 200


def test_config(config):
    assert config['TESTING'] == True
    assert (config['SQLALCHEMY_DATABASE_URI'] ==
        'postgres://postgres:postgres@backend-db:5432/backend_test'
    )

@pytest.fixture
def app():
    app = create_app()
    app.config.from_object('backend.config.DevelopmentConfig')
    return app

def test_example(app):
    response = app.test_client().get('/')
    assert response.status_code == 200

def test_config(config):
    assert config['TESTING'] == False
    assert (config['SQLALCHEMY_DATABASE_URI'] ==
        'postgres://postgres:postgres@backend-db:5432/backend_dev'
    )
