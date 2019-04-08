from backend.server import create_app
from backend.server import db as db_
import pytest

@pytest.fixture(scope='session')
def app(request):
    app = create_app()
    app.config.from_object('backend.config.TestingConfig')

    ctx = app.app_context()
    ctx.push()

    def teardown():
        ctx.pop()
    request.addfinalizer(teardown)
    return app

@pytest.fixture(scope='session')
def db(app, request):
    def teardown():
        db_.drop_all()

    db_.app = app
    db_.create_all()
    request.addfinalizer(teardown)
    return db_

@pytest.fixture(scope='function')
def session(db, request):
    connection = db.engine.connect()
    transaction = connection.begin()

    options = dict(bind=connection, binds={})
    session = db.create_scoped_session(options=options)

    db.session = session

    def teardown():
        transaction.rollback()
        connection.close()
        session.remove()
    request.addfinalizer(teardown)
    return session
