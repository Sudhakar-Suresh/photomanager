#!/usr/bin/env python3
"""
Test script to verify Photography Management System setup
"""

import os
import sys
import subprocess
import requests
from pathlib import Path


def check_python_version():
    """Check if Python version is compatible"""
    if sys.version_info < (3, 8):
        print("❌ Python 3.8+ required")
        return False
    print("✅ Python version compatible")
    return True


def check_virtual_environment():
    """Check if virtual environment is activated"""
    if hasattr(sys, 'real_prefix') or (hasattr(sys, 'base_prefix') and sys.base_prefix != sys.prefix):
        print("✅ Virtual environment activated")
        return True
    print("⚠️  Virtual environment not detected")
    return False


def check_django_installation():
    """Check if Django is installed and working"""
    try:
        import django
        print(f"✅ Django {django.get_version()} installed")
        return True
    except ImportError:
        print("❌ Django not installed")
        return False


def check_dependencies():
    """Check if all required dependencies are installed"""
    required_packages = [
        'djangorestframework',
        'django-cors-headers',
        'python-decouple',
        'supabase',
        'PyJWT',
        'requests',
        'Pillow'
    ]

    missing_packages = []
    for package in required_packages:
        try:
            __import__(package.replace('-', '_'))
            print(f"✅ {package} installed")
        except ImportError:
            print(f"❌ {package} not installed")
            missing_packages.append(package)

    return len(missing_packages) == 0


def check_django_project():
    """Check if Django project is properly configured"""
    backend_path = Path("backend")
    if not backend_path.exists():
        print("❌ Backend directory not found")
        return False

    manage_py = backend_path / "manage.py"
    if not manage_py.exists():
        print("❌ manage.py not found")
        return False

    print("✅ Django project structure exists")
    return True


def check_frontend_setup():
    """Check if frontend is properly set up"""
    frontend_path = Path("frontend")
    if not frontend_path.exists():
        print("❌ Frontend directory not found")
        return False

    package_json = frontend_path / "package.json"
    if not package_json.exists():
        print("❌ package.json not found")
        return False

    node_modules = frontend_path / "node_modules"
    if not node_modules.exists():
        print("⚠️  Node modules not installed. Run 'npm install' in frontend directory")
        return False

    print("✅ Frontend setup complete")
    return True


def check_environment_files():
    """Check if environment files exist"""
    backend_env = Path("backend/.env")
    frontend_env = Path("frontend/.env")

    if not backend_env.exists():
        print("⚠️  Backend .env file not found. Copy from .env.example")
    else:
        print("✅ Backend .env file exists")

    if not frontend_env.exists():
        print("⚠️  Frontend .env file not found. Copy from .env.example")
    else:
        print("✅ Frontend .env file exists")


def run_django_checks():
    """Run Django system checks"""
    try:
        os.chdir("backend")
        result = subprocess.run([sys.executable, "manage.py", "check"],
                                capture_output=True, text=True)
        os.chdir("..")

        if result.returncode == 0:
            print("✅ Django system checks passed")
            return True
        else:
            print(f"❌ Django system checks failed: {result.stderr}")
            return False
    except Exception as e:
        print(f"❌ Error running Django checks: {e}")
        return False


def main():
    """Run all setup checks"""
    print("🔍 Photography Management System Setup Check\n")

    checks = [
        ("Python Version", check_python_version),
        ("Virtual Environment", check_virtual_environment),
        ("Django Installation", check_django_installation),
        ("Dependencies", check_dependencies),
        ("Django Project", check_django_project),
        ("Frontend Setup", check_frontend_setup),
        ("Django System Checks", run_django_checks),
    ]

    passed = 0
    total = len(checks)

    for name, check_func in checks:
        print(f"\n📋 Checking {name}...")
        if check_func():
            passed += 1

    print(f"\n📊 Setup Check Results: {passed}/{total} checks passed")

    if passed == total:
        print("\n🎉 All checks passed! Your setup is ready.")
        print("\nNext steps:")
        print("1. Copy .env.example files and configure with your Supabase credentials")
        print("2. Run 'python backend/manage.py runserver' to start the backend")
        print("3. Run 'npm run dev' in the frontend directory to start the frontend")
    else:
        print("\n⚠️  Some checks failed. Please fix the issues above.")

    # Check environment files separately
    print("\n📋 Checking Environment Files...")
    check_environment_files()


if __name__ == "__main__":
    main()
